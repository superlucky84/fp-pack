import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';
import split from '../string/split';
import replace from '../string/replace';
import match from '../string/match';
import equals from '../equality/equals';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type EffectUnion<T> = Extract<T, SideEffect<any>> extends SideEffect<infer E> ? E : never;
type ValueUnion<T> = Exclude<T, SideEffect<any>>;

export const pipeStringReplaceMatch = pipe(
  replace(/\s+/g, '-'),
  match(/-/g),
  (result) => (result ? result.length : 0)
);

type PipeStringReplaceMatchExpected = (input: string) => number;
export type PipeStringReplaceMatchIsStrict = Expect<
  Equal<typeof pipeStringReplaceMatch, PipeStringReplaceMatchExpected>
>;

export const pipeStringSplit = pipe(
  split(','),
  (parts) => parts.length
);

type PipeStringSplitExpected = (input: string) => number;
export type PipeStringSplitIsStrict = Expect<Equal<typeof pipeStringSplit, PipeStringSplitExpected>>;

export const pipeStringSplitRegex = pipe(
  split(/\s+/),
  (parts) => parts[0] ?? ''
);

type PipeStringSplitRegexExpected = (input: string) => string;
export type PipeStringSplitRegexIsStrict = Expect<
  Equal<typeof pipeStringSplitRegex, PipeStringSplitRegexExpected>
>;

const splitSeparatorUnion: string | RegExp = Math.random() > 0.5 ? ',' : /\s+/;
export const pipeStringSplitUnion = pipe(
  split(splitSeparatorUnion),
  (parts) => parts.join('|')
);

type PipeStringSplitUnionExpected = (input: string) => string;
export type PipeStringSplitUnionIsStrict = Expect<
  Equal<typeof pipeStringSplitUnion, PipeStringSplitUnionExpected>
>;

const replacePatternUnion: string | RegExp = Math.random() > 0.5 ? 'a' : /a/g;
export const pipeStringReplaceUnion = pipe(
  replace(replacePatternUnion, 'b'),
  (value) => value.length
);

type PipeStringReplaceUnionExpected = (input: string) => number;
export type PipeStringReplaceUnionIsStrict = Expect<
  Equal<typeof pipeStringReplaceUnion, PipeStringReplaceUnionExpected>
>;

const matchPatternUnion: RegExp | string = Math.random() > 0.5 ? /a/g : 'a';
const matchPatternRegExp = matchPatternUnion instanceof RegExp ? matchPatternUnion : new RegExp(matchPatternUnion);
export const pipeStringMatchUnion = pipe(
  match(matchPatternRegExp),
  (result) => (result ? result.length : 0)
);

type PipeStringMatchUnionExpected = (input: string) => number;
export type PipeStringMatchUnionIsStrict = Expect<
  Equal<typeof pipeStringMatchUnion, PipeStringMatchUnionExpected>
>;

export const pipeStringEquals = pipe(
  split(','),
  (parts) => parts[0] ?? '',
  equals('a')
);

type PipeStringEqualsExpected = (input: string) => boolean;
export type PipeStringEqualsIsStrict = Expect<Equal<typeof pipeStringEquals, PipeStringEqualsExpected>>;

export const pipeSideEffectString = pipeSideEffect(
  replace('a', 'b'),
  (value: string) => (value.length > 0 ? value : SideEffect.of(() => 'EMPTY' as const))
);

type PipeSideEffectStringExpected = (input: string | SideEffect<any>) => string | SideEffect<any>;
export type PipeSideEffectStringIsStrict = Expect<
  Equal<typeof pipeSideEffectString, PipeSideEffectStringExpected>
>;

export const pipeSideEffectStrictString = pipeSideEffectStrict(
  match(/a/g),
  (result: RegExpMatchArray | null) =>
    result && result.length > 0 ? result : SideEffect.of(() => 'NO_MATCH' as const),
  (result: RegExpMatchArray) => result.length
);

export const pipeSideEffectStrictStringResult = pipeSideEffectStrictString('aa');

type PipeSideEffectStrictStringResultExpected = number | SideEffect<'NO_MATCH'>;
export type PipeSideEffectStrictStringResultIsStrict = Expect<
  Equal<typeof pipeSideEffectStrictStringResult, PipeSideEffectStrictStringResultExpected>
>;

type PipeSideEffectStrictStringEffects = EffectUnion<typeof pipeSideEffectStrictStringResult>;
export type PipeSideEffectStrictStringEffectsIsStrict = Expect<
  Equal<PipeSideEffectStrictStringEffects, 'NO_MATCH'>
>;

type PipeSideEffectStrictStringValue = ValueUnion<typeof pipeSideEffectStrictStringResult>;
export type PipeSideEffectStrictStringValueIsStrict = Expect<Equal<PipeSideEffectStrictStringValue, number>>;

export const pipeAsyncString = pipeAsync(
  replace(/\s+/g, ''),
  async (value: string) => value.toUpperCase(),
  (value: string) => value.length
);

type PipeAsyncStringExpected = (input: string) => Promise<number>;
export type PipeAsyncStringIsStrict = Expect<Equal<typeof pipeAsyncString, PipeAsyncStringExpected>>;

export const pipeAsyncSideEffectString = pipeAsyncSideEffect(
  split(','),
  async (parts: string[]) => parts.join('-'),
  equals('a-b'),
  async (isMatch: boolean) => (isMatch ? Boolean(isMatch) : SideEffect.of(() => 'NO_MATCH' as const))
);

type PipeAsyncSideEffectStringExpected = (input: string | SideEffect<any>) => Promise<boolean | SideEffect<any>>;
export type PipeAsyncSideEffectStringIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectString, PipeAsyncSideEffectStringExpected>
>;

export const pipeAsyncSideEffectStrictString = pipeAsyncSideEffectStrict(
  match(/a/g),
  async (result: RegExpMatchArray | null) =>
    result && result.length > 0 ? result : SideEffect.of(() => 'NO_MATCH' as const),
  (result: RegExpMatchArray) => result.length
);

export const pipeAsyncSideEffectStrictStringResult = pipeAsyncSideEffectStrictString('aa');

type PipeAsyncSideEffectStrictStringResultExpected = Promise<number | SideEffect<'NO_MATCH'>>;
export type PipeAsyncSideEffectStrictStringResultIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStrictStringResult, PipeAsyncSideEffectStrictStringResultExpected>
>;

type PipeAsyncSideEffectStrictStringResolved = Awaited<typeof pipeAsyncSideEffectStrictStringResult>;
type PipeAsyncSideEffectStrictStringEffects = EffectUnion<PipeAsyncSideEffectStrictStringResolved>;
export type PipeAsyncSideEffectStrictStringEffectsIsStrict = Expect<
  Equal<PipeAsyncSideEffectStrictStringEffects, 'NO_MATCH'>
>;

type PipeAsyncSideEffectStrictStringValue = ValueUnion<PipeAsyncSideEffectStrictStringResolved>;
export type PipeAsyncSideEffectStrictStringValueIsStrict = Expect<
  Equal<PipeAsyncSideEffectStrictStringValue, number>
>;
