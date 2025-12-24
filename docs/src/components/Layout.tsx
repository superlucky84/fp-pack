import { mount } from 'lithent';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { appStore } from '@/store';
import { Home } from '@/pages/Home';
import { Home_ko } from '@/pages/Home_ko';
import { Pipe } from '@/pages/Pipe';
import { Pipe_ko } from '@/pages/Pipe_ko';
import { Compose } from '@/pages/Compose';
import { Compose_ko } from '@/pages/Compose_ko';
import { Curry } from '@/pages/Curry';
import { Curry_ko } from '@/pages/Curry_ko';
import { Partial } from '@/pages/Partial';
import { Partial_ko } from '@/pages/Partial_ko';
import { Flip } from '@/pages/Flip';
import { Flip_ko } from '@/pages/Flip_ko';
import { Identity } from '@/pages/Identity';
import { Identity_ko } from '@/pages/Identity_ko';
import { Constant } from '@/pages/Constant';
import { Constant_ko } from '@/pages/Constant_ko';
import { Memoize } from '@/pages/Memoize';
import { Memoize_ko } from '@/pages/Memoize_ko';
import { Once } from '@/pages/Once';
import { Once_ko } from '@/pages/Once_ko';
import { Tap } from '@/pages/Tap';
import { Tap_ko } from '@/pages/Tap_ko';
import { Chunk } from '@/pages/Chunk';
import { Chunk_ko } from '@/pages/Chunk_ko';
import { Cond } from '@/pages/Cond';
import { Cond_ko } from '@/pages/Cond_ko';
import { When } from '@/pages/When';
import { When_ko } from '@/pages/When_ko';
import { Unless } from '@/pages/Unless';
import { Unless_ko } from '@/pages/Unless_ko';
import { IfElse } from '@/pages/IfElse';
import { IfElse_ko } from '@/pages/IfElse_ko';
import { Guard } from '@/pages/Guard';
import { Guard_ko } from '@/pages/Guard_ko';
import { TryCatch } from '@/pages/TryCatch';
import { TryCatch_ko } from '@/pages/TryCatch_ko';
import { Assert } from '@/pages/Assert';
import { Assert_ko } from '@/pages/Assert_ko';
import { Invariant } from '@/pages/Invariant';
import { Invariant_ko } from '@/pages/Invariant_ko';
import { Log } from '@/pages/Log';
import { Log_ko } from '@/pages/Log_ko';
import { Debounce } from '@/pages/Debounce';
import { Debounce_ko } from '@/pages/Debounce_ko';
import { DebounceLeading } from '@/pages/DebounceLeading';
import { DebounceLeading_ko } from '@/pages/DebounceLeading_ko';
import { DebounceLeadingTrailing } from '@/pages/DebounceLeadingTrailing';
import { DebounceLeadingTrailing_ko } from '@/pages/DebounceLeadingTrailing_ko';
import { Delay } from '@/pages/Delay';
import { Delay_ko } from '@/pages/Delay_ko';
import { Timeout } from '@/pages/Timeout';
import { Timeout_ko } from '@/pages/Timeout_ko';
import { Clamp } from '@/pages/Clamp';
import { Clamp_ko } from '@/pages/Clamp_ko';
import { Equals } from '@/pages/Equals';
import { Equals_ko } from '@/pages/Equals_ko';
import { IsEmpty } from '@/pages/IsEmpty';
import { IsEmpty_ko } from '@/pages/IsEmpty_ko';
import { IsNil } from '@/pages/IsNil';
import { IsNil_ko } from '@/pages/IsNil_ko';
import { IsType } from '@/pages/IsType';
import { IsType_ko } from '@/pages/IsType_ko';
import { Includes } from '@/pages/Includes';
import { Includes_ko } from '@/pages/Includes_ko';
import { Gt } from '@/pages/Gt';
import { Gt_ko } from '@/pages/Gt_ko';
import { Gte } from '@/pages/Gte';
import { Gte_ko } from '@/pages/Gte_ko';
import { Lt } from '@/pages/Lt';
import { Lt_ko } from '@/pages/Lt_ko';
import { Lte } from '@/pages/Lte';
import { Lte_ko } from '@/pages/Lte_ko';
import { Drop } from '@/pages/Drop';
import { Drop_ko } from '@/pages/Drop_ko';
import { Every } from '@/pages/Every';
import { Every_ko } from '@/pages/Every_ko';
import { Map } from '@/pages/Map';
import { Map_ko } from '@/pages/Map_ko';
import { Filter } from '@/pages/Filter';
import { Filter_ko } from '@/pages/Filter_ko';
import { Find } from '@/pages/Find';
import { Find_ko } from '@/pages/Find_ko';
import { FlatMap } from '@/pages/FlatMap';
import { FlatMap_ko } from '@/pages/FlatMap_ko';
import { GroupBy } from '@/pages/GroupBy';
import { GroupBy_ko } from '@/pages/GroupBy_ko';
import { Reduce } from '@/pages/Reduce';
import { Reduce_ko } from '@/pages/Reduce_ko';
import { Some } from '@/pages/Some';
import { Some_ko } from '@/pages/Some_ko';
import { Sort } from '@/pages/Sort';
import { Sort_ko } from '@/pages/Sort_ko';
import { SortBy } from '@/pages/SortBy';
import { SortBy_ko } from '@/pages/SortBy_ko';
import { Take } from '@/pages/Take';
import { Take_ko } from '@/pages/Take_ko';
import { Uniq } from '@/pages/Uniq';
import { Uniq_ko } from '@/pages/Uniq_ko';
import { UniqBy } from '@/pages/UniqBy';
import { UniqBy_ko } from '@/pages/UniqBy_ko';
import { Unzip } from '@/pages/Unzip';
import { Unzip_ko } from '@/pages/Unzip_ko';
import { ZipIndex } from '@/pages/ZipIndex';
import { ZipIndex_ko } from '@/pages/ZipIndex_ko';
import { Zip } from '@/pages/Zip';
import { Zip_ko } from '@/pages/Zip_ko';
import { Maybe } from '@/pages/Maybe';
import { Maybe_ko } from '@/pages/Maybe_ko';
import { EndsWith } from '@/pages/EndsWith';
import { EndsWith_ko } from '@/pages/EndsWith_ko';
import { StartsWith } from '@/pages/StartsWith';
import { StartsWith_ko } from '@/pages/StartsWith_ko';
import { Join } from '@/pages/Join';
import { Join_ko } from '@/pages/Join_ko';
import { Match } from '@/pages/Match';
import { Match_ko } from '@/pages/Match_ko';
import { Replace } from '@/pages/Replace';
import { Replace_ko } from '@/pages/Replace_ko';
import { Split } from '@/pages/Split';
import { Split_ko } from '@/pages/Split_ko';
import { ToLower } from '@/pages/ToLower';
import { ToLower_ko } from '@/pages/ToLower_ko';
import { ToUpper } from '@/pages/ToUpper';
import { ToUpper_ko } from '@/pages/ToUpper_ko';
import { Trim } from '@/pages/Trim';
import { Trim_ko } from '@/pages/Trim_ko';
import { PipeAsync } from '@/pages/PipeAsync';
import { PipeAsync_ko } from '@/pages/PipeAsync_ko';
import { Retry } from '@/pages/Retry';
import { Retry_ko } from '@/pages/Retry_ko';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageComponent = () => any;

const normalizeRoute = (path: string) => {
  const cleaned = path.replace(/\/+$/, '');
  return cleaned || '/';
};

const routes: Record<string, PageComponent> = {
  '/': Home,
  '/ko': Home_ko,
  '/composition/pipe': Pipe,
  '/ko/composition/pipe': Pipe_ko,
  '/composition/compose': Compose,
  '/ko/composition/compose': Compose_ko,
  '/composition/curry': Curry,
  '/ko/composition/curry': Curry_ko,
  '/composition/partial': Partial,
  '/ko/composition/partial': Partial_ko,
  '/composition/flip': Flip,
  '/ko/composition/flip': Flip_ko,
  '/composition/identity': Identity,
  '/ko/composition/identity': Identity_ko,
  '/composition/constant': Constant,
  '/ko/composition/constant': Constant_ko,
  '/composition/memoize': Memoize,
  '/ko/composition/memoize': Memoize_ko,
  '/composition/once': Once,
  '/ko/composition/once': Once_ko,
  '/composition/tap': Tap,
  '/ko/composition/tap': Tap_ko,
  '/async/pipeAsync': PipeAsync,
  '/ko/async/pipeAsync': PipeAsync_ko,
  '/async/delay': Delay,
  '/ko/async/delay': Delay_ko,
  '/async/timeout': Timeout,
  '/ko/async/timeout': Timeout_ko,
  '/async/retry': Retry,
  '/ko/async/retry': Retry_ko,
  '/control/when': When,
  '/ko/control/when': When_ko,
  '/control/unless': Unless,
  '/ko/control/unless': Unless_ko,
  '/control/ifElse': IfElse,
  '/ko/control/ifElse': IfElse_ko,
  '/control/guard': Guard,
  '/ko/control/guard': Guard_ko,
  '/control/tryCatch': TryCatch,
  '/ko/control/tryCatch': TryCatch_ko,
  '/control/cond': Cond,
  '/ko/control/cond': Cond_ko,
  '/debug/assert': Assert,
  '/ko/debug/assert': Assert_ko,
  '/debug/invariant': Invariant,
  '/ko/debug/invariant': Invariant_ko,
  '/debug/log': Log,
  '/ko/debug/log': Log_ko,
  '/async/debounce': Debounce,
  '/ko/async/debounce': Debounce_ko,
  '/async/debounceLeading': DebounceLeading,
  '/ko/async/debounceLeading': DebounceLeading_ko,
  '/async/debounceLeadingTrailing': DebounceLeadingTrailing,
  '/ko/async/debounceLeadingTrailing': DebounceLeadingTrailing_ko,
  '/equality/isEmpty': IsEmpty,
  '/ko/equality/isEmpty': IsEmpty_ko,
  '/equality/isNil': IsNil,
  '/ko/equality/isNil': IsNil_ko,
  '/equality/isType': IsType,
  '/ko/equality/isType': IsType_ko,
  '/equality/includes': Includes,
  '/ko/equality/includes': Includes_ko,
  '/equality/clamp': Clamp,
  '/ko/equality/clamp': Clamp_ko,
  '/equality/equals': Equals,
  '/ko/equality/equals': Equals_ko,
  '/equality/gt': Gt,
  '/ko/equality/gt': Gt_ko,
  '/equality/gte': Gte,
  '/ko/equality/gte': Gte_ko,
  '/equality/lt': Lt,
  '/ko/equality/lt': Lt_ko,
  '/equality/lte': Lte,
  '/ko/equality/lte': Lte_ko,
  '/array/chunk': Chunk,
  '/ko/array/chunk': Chunk_ko,
  '/array/drop': Drop,
  '/ko/array/drop': Drop_ko,
  '/array/every': Every,
  '/ko/array/every': Every_ko,
  '/array/map': Map,
  '/ko/array/map': Map_ko,
  '/array/filter': Filter,
  '/ko/array/filter': Filter_ko,
  '/array/find': Find,
  '/ko/array/find': Find_ko,
  '/array/flatMap': FlatMap,
  '/ko/array/flatMap': FlatMap_ko,
  '/array/groupBy': GroupBy,
  '/ko/array/groupBy': GroupBy_ko,
  '/array/reduce': Reduce,
  '/ko/array/reduce': Reduce_ko,
  '/array/some': Some,
  '/ko/array/some': Some_ko,
  '/array/sort': Sort,
  '/ko/array/sort': Sort_ko,
  '/array/sortBy': SortBy,
  '/ko/array/sortBy': SortBy_ko,
  '/array/take': Take,
  '/ko/array/take': Take_ko,
  '/array/uniq': Uniq,
  '/ko/array/uniq': Uniq_ko,
  '/array/uniqBy': UniqBy,
  '/ko/array/uniqBy': UniqBy_ko,
  '/array/unzip': Unzip,
  '/ko/array/unzip': Unzip_ko,
  '/array/zip': Zip,
  '/ko/array/zip': Zip_ko,
  '/array/zipIndex': ZipIndex,
  '/ko/array/zipIndex': ZipIndex_ko,
  '/string/endsWith': EndsWith,
  '/ko/string/endsWith': EndsWith_ko,
  '/string/startsWith': StartsWith,
  '/ko/string/startsWith': StartsWith_ko,
  '/string/toLower': ToLower,
  '/ko/string/toLower': ToLower_ko,
  '/string/join': Join,
  '/ko/string/join': Join_ko,
  '/string/match': Match,
  '/ko/string/match': Match_ko,
  '/string/replace': Replace,
  '/ko/string/replace': Replace_ko,
  '/string/split': Split,
  '/ko/string/split': Split_ko,
  '/string/toUpper': ToUpper,
  '/ko/string/toUpper': ToUpper_ko,
  '/string/trim': Trim,
  '/ko/string/trim': Trim_ko,
  '/maybe/maybe': Maybe,
  '/ko/maybe/maybe': Maybe_ko,
};

const resolveRoute = (path: string): PageComponent => {
  const normalized = normalizeRoute(path);
  return routes[normalized] || Home;
};

export const Layout = mount(renew => {
  const store = appStore.watch(renew);

  return () => {
    const CurrentPage = resolveRoute(store.route);

    return (
      <div class="min-h-screen bg-white dark:bg-[#1b1b1f] transition-colors">
        <Header />

        <div class="mx-auto max-w-[1440px]">
          <div class="flex">
            <Sidebar />

            <main class="flex-1 w-full min-w-0 px-6 md:px-12 py-8 max-w-full">
              <div class="max-w-full md:max-w-[43rem] page-shell">
                <CurrentPage />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };
});
