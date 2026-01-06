import SideEffect from "./sideEffect";
import pipe from "./pipe";
import pipeSideEffect from "./pipeSideEffect";
import pipeSideEffectStrict from "./pipeSideEffectStrict";
import pipeAsync from "../async/pipeAsync";
import pipeAsyncSideEffect from "../async/pipeAsyncSideEffect";
import pipeAsyncSideEffectStrict from "../async/pipeAsyncSideEffectStrict";
import assoc from "../object/assoc";
import assocPath from "../object/assocPath";
import dissocPath from "../object/dissocPath";
import evolve from "../object/evolve";
import has from "../object/has";
import merge from "../object/merge";
import mergeDeep from "../object/mergeDeep";
import omit from "../object/omit";
import path from "../object/path";
import pick from "../object/pick";
import prop from "../object/prop";

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
type Expect<T extends true> = T;
type EffectUnion<T> =
  Extract<T, SideEffect<any>> extends SideEffect<infer E> ? E : never;
type ValueUnion<T> = Exclude<T, SideEffect<any>>;

type Meta = {
  active: boolean;
  tags: string[];
};

type UserBase = {
  id: number;
  name: string;
  meta?: Meta;
};

type UserWithMeta = UserBase & { meta: Meta };
type UserWithFlags = UserWithMeta & { flagged: boolean };
type UserPick = Pick<UserWithFlags, "id" | "meta" | "flagged">;

const addMeta = assoc("meta", { active: true, tags: ["new"] } as Meta) as (
  user: UserBase
) => UserWithMeta;
const addFlag = merge({ flagged: true }) as (
  user: UserWithMeta
) => UserWithFlags;
const pickUser = pick(["id", "meta", "flagged"] as Array<
  "id" | "meta" | "flagged"
>) as (user: UserWithFlags) => UserPick;
const getMeta = prop("meta") as (user: UserPick) => Meta | undefined;

export const pipeObjectMeta = pipe(addMeta, addFlag, pickUser, getMeta);

type PipeObjectMetaExpected = (input: UserBase) => Meta | undefined;
export type PipeObjectMetaIsStrict = Expect<
  Equal<typeof pipeObjectMeta, PipeObjectMetaExpected>
>;

type ThemeState = {
  profile?: {
    prefs?: {
      theme?: string;
    };
  };
};

const setTheme = (value: ThemeState) =>
  assocPath<ThemeState>(["profile", "prefs", "theme"], "dark", value);
const clearTheme = dissocPath<ThemeState>(["profile", "prefs", "theme"]);
const readTheme = (value: ThemeState) =>
  path<string>(["profile", "prefs", "theme"], value);

export const pipeObjectTheme = pipe(setTheme, clearTheme, readTheme);

type PipeObjectThemeExpected = (input: ThemeState) => string | undefined;
export type PipeObjectThemeIsStrict = Expect<
  Equal<typeof pipeObjectTheme, PipeObjectThemeExpected>
>;

type NamedUser = {
  id: number;
  name: string;
  meta?: Meta;
};

const dropMeta = omit(["meta"] as Array<"meta">) as (
  user: NamedUser
) => Omit<NamedUser, "meta">;
const hasName = has("name") as (user: Omit<NamedUser, "meta">) => boolean;

export const pipeObjectHasName = pipe(dropMeta, hasName);

type PipeObjectHasNameExpected = (input: NamedUser) => boolean;
export type PipeObjectHasNameIsStrict = Expect<
  Equal<typeof pipeObjectHasName, PipeObjectHasNameExpected>
>;

type Counter = {
  count: number;
  label?: string;
};

const bumpCount = (value: Counter) =>
  evolve({ count: (count: number) => count + 1 }, value);
const getCount = prop("count") as (value: Counter) => number | undefined;

export const pipeObjectEvolve = pipe(bumpCount, getCount);

type PipeObjectEvolveExpected = (input: Counter) => number | undefined;
export type PipeObjectEvolveIsStrict = Expect<
  Equal<typeof pipeObjectEvolve, PipeObjectEvolveExpected>
>;

type MaybeUser = {
  id: number;
  name?: string;
  meta?: Meta;
};

type MaybeUserWithMeta = MaybeUser & { meta: Meta };
type MaybeUserWithoutMeta = Omit<MaybeUserWithMeta, "meta">;

const addMetaMaybe = assoc("meta", { active: false, tags: [] } as Meta) as (
  user: MaybeUser
) => MaybeUserWithMeta;
const hasNameMaybe = has("name") as (user: MaybeUser) => boolean;
const stripMeta = omit(["meta"] as Array<"meta">) as (
  user: MaybeUserWithMeta
) => MaybeUserWithoutMeta;
const getNameMaybe = prop("name") as (
  user: MaybeUserWithoutMeta
) => string | undefined;

export const pipeSideEffectObject = pipeSideEffect(
  addMetaMaybe,
  (value: MaybeUserWithMeta) =>
    hasNameMaybe(value) ? value : SideEffect.of(() => "NO_NAME" as const),
  stripMeta,
  getNameMaybe
);

type PipeSideEffectObjectExpected = (
  input: MaybeUser | SideEffect<any>
) => string | undefined | SideEffect<any>;
export type PipeSideEffectObjectIsStrict = Expect<
  Equal<typeof pipeSideEffectObject, PipeSideEffectObjectExpected>
>;

type Account = {
  id?: string;
  profile?: {
    role?: string;
  };
};

const setRole = (value: Account) =>
  assocPath<Account>(["profile", "role"], "member", value);
const readRole = (value: Account) => path<string>(["profile", "role"], value);
const clearRole = dissocPath<Account>(["profile", "role"]);

export const pipeSideEffectStrictObject = pipeSideEffectStrict(
  assocPath(["profile", "role"], "member"),
  (value: Account) =>
    value.id ? value : SideEffect.of(() => "NO_ID" as const),
  (value: Account) =>
    readRole(value) ? value : SideEffect.of(() => "NO_ROLE" as const),
  clearRole
);

export const pipeSideEffectStrictObjectResult = pipeSideEffectStrictObject({});

type PipeSideEffectStrictObjectResultExpected =
  | Account
  | SideEffect<"NO_ID" | "NO_ROLE">;
export type PipeSideEffectStrictObjectResultIsStrict = Expect<
  Equal<
    typeof pipeSideEffectStrictObjectResult,
    PipeSideEffectStrictObjectResultExpected
  >
>;

type PipeSideEffectStrictObjectEffects = EffectUnion<
  typeof pipeSideEffectStrictObjectResult
>;
type PipeSideEffectStrictObjectEffectsExpected = "NO_ID" | "NO_ROLE";
export type PipeSideEffectStrictObjectEffectsIsStrict = Expect<
  Equal<
    PipeSideEffectStrictObjectEffects,
    PipeSideEffectStrictObjectEffectsExpected
  >
>;

type PipeSideEffectStrictObjectValue = ValueUnion<
  typeof pipeSideEffectStrictObjectResult
>;
export type PipeSideEffectStrictObjectValueIsStrict = Expect<
  Equal<PipeSideEffectStrictObjectValue, Account>
>;

type AsyncConfig = {
  id: number;
  count: number;
  flags?: {
    active?: boolean;
  };
};

const addDefaults = (value: AsyncConfig) =>
  mergeDeep({ flags: { active: true } }, value);
const bumpAsyncCount = (value: AsyncConfig) =>
  evolve({ count: (count: number) => count + 1 }, value);
const pickConfig = pick(["id", "flags"] as Array<"id" | "flags">) as (
  value: AsyncConfig
) => Pick<AsyncConfig, "id" | "flags">;

export const pipeAsyncObject = pipeAsync(
  (value: AsyncConfig) => mergeDeep({ flags: { active: true } }, value),
  bumpAsyncCount,
  async (value: AsyncConfig) => value,
  pickConfig
);

type PipeAsyncObjectExpected = (
  input: AsyncConfig
) => Promise<Pick<AsyncConfig, "id" | "flags">>;
export type PipeAsyncObjectIsStrict = Expect<
  Equal<typeof pipeAsyncObject, PipeAsyncObjectExpected>
>;

type Payment = {
  id: string;
  amount?: number;
  meta?: Meta;
};

const attachMeta = assoc("meta", { active: true, tags: ["pay"] } as Meta) as (
  value: Payment
) => Payment & { meta: Meta };
const getAmount = prop("amount") as (
  value: Payment & { meta: Meta }
) => number | undefined;

export const pipeAsyncSideEffectObject = pipeAsyncSideEffect(
  attachMeta,
  getAmount,
  async (amount: number | undefined) =>
    amount && amount > 0
      ? amount
      : SideEffect.of(() => "INVALID_AMOUNT" as const)
);

type PipeAsyncSideEffectObjectExpected = (
  input: Payment | SideEffect<any>
) => Promise<number | SideEffect<any>>;
export type PipeAsyncSideEffectObjectIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectObject, PipeAsyncSideEffectObjectExpected>
>;

type Payload = {
  id?: string;
  data?: {
    value?: number;
  };
};

const setValue = (value: Payload) =>
  assocPath<Payload>(["data", "value"], 1, value);
const readValue = (value: Payload) => path<number>(["data", "value"], value);

export const pipeAsyncSideEffectStrictObject = pipeAsyncSideEffectStrict(
  setValue,
  async (value: Payload) =>
    value.id ? value : SideEffect.of(() => "NO_ID" as const),
  (value: Payload) =>
    readValue(value) ? value : SideEffect.of(() => "NO_VALUE" as const)
);

export const pipeAsyncSideEffectStrictObjectResult =
  pipeAsyncSideEffectStrictObject({});

type PipeAsyncSideEffectStrictObjectResultExpected = Promise<
  Payload | SideEffect<"NO_ID" | "NO_VALUE">
>;
export type PipeAsyncSideEffectStrictObjectResultIsStrict = Expect<
  Equal<
    typeof pipeAsyncSideEffectStrictObjectResult,
    PipeAsyncSideEffectStrictObjectResultExpected
  >
>;

type PipeAsyncSideEffectStrictResolved = Awaited<
  typeof pipeAsyncSideEffectStrictObjectResult
>;
type PipeAsyncSideEffectStrictEffects =
  EffectUnion<PipeAsyncSideEffectStrictResolved>;
type PipeAsyncSideEffectStrictEffectsExpected = "NO_ID" | "NO_VALUE";
export type PipeAsyncSideEffectStrictEffectsIsStrict = Expect<
  Equal<
    PipeAsyncSideEffectStrictEffects,
    PipeAsyncSideEffectStrictEffectsExpected
  >
>;

type PipeAsyncSideEffectStrictValue =
  ValueUnion<PipeAsyncSideEffectStrictResolved>;
export type PipeAsyncSideEffectStrictValueIsStrict = Expect<
  Equal<PipeAsyncSideEffectStrictValue, Payload>
>;
