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
