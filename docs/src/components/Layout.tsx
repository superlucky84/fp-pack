import { mount } from 'lithent';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { appStore } from '@/store';
import { Home } from '@/pages/Home';
import { Home_ko } from '@/pages/Home_ko';
import { Guide } from '@/pages/Guide';
import { Guide_ko } from '@/pages/Guide_ko';
import { Pipe } from '@/pages/Pipe';
import { Pipe_ko } from '@/pages/Pipe_ko';
import { PipeSideEffect } from '@/pages/PipeSideEffect';
import { PipeSideEffect_ko } from '@/pages/PipeSideEffect_ko';
import { PipeSideEffectStrict } from '@/pages/PipeSideEffectStrict';
import { PipeSideEffectStrict_ko } from '@/pages/PipeSideEffectStrict_ko';
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
import { From } from '@/pages/From';
import { From_ko } from '@/pages/From_ko';
import { Complement } from '@/pages/Complement';
import { Complement_ko } from '@/pages/Complement_ko';
import { Memoize } from '@/pages/Memoize';
import { Memoize_ko } from '@/pages/Memoize_ko';
import { Once } from '@/pages/Once';
import { Once_ko } from '@/pages/Once_ko';
import { Tap } from '@/pages/Tap';
import { Tap_ko } from '@/pages/Tap_ko';
import { SideEffect } from '@/pages/SideEffect';
import { SideEffect_ko } from '@/pages/SideEffect_ko';
import { IsSideEffect } from '@/pages/IsSideEffect';
import { IsSideEffect_ko } from '@/pages/IsSideEffect_ko';
import { MatchSideEffect } from '@/pages/MatchSideEffect';
import { MatchSideEffect_ko } from '@/pages/MatchSideEffect_ko';
import { RunPipeResult } from '@/pages/RunPipeResult';
import { RunPipeResult_ko } from '@/pages/RunPipeResult_ko';
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
import { StreamChunk } from '@/pages/StreamChunk';
import { StreamChunk_ko } from '@/pages/StreamChunk_ko';
import { StreamConcat } from '@/pages/StreamConcat';
import { StreamConcat_ko } from '@/pages/StreamConcat_ko';
import { StreamDrop } from '@/pages/StreamDrop';
import { StreamDrop_ko } from '@/pages/StreamDrop_ko';
import { StreamDropWhile } from '@/pages/StreamDropWhile';
import { StreamDropWhile_ko } from '@/pages/StreamDropWhile_ko';
import { StreamEvery } from '@/pages/StreamEvery';
import { StreamEvery_ko } from '@/pages/StreamEvery_ko';
import { StreamFilter } from '@/pages/StreamFilter';
import { StreamFilter_ko } from '@/pages/StreamFilter_ko';
import { StreamFind } from '@/pages/StreamFind';
import { StreamFind_ko } from '@/pages/StreamFind_ko';
import { StreamFlatMap } from '@/pages/StreamFlatMap';
import { StreamFlatMap_ko } from '@/pages/StreamFlatMap_ko';
import { StreamFlatten } from '@/pages/StreamFlatten';
import { StreamFlatten_ko } from '@/pages/StreamFlatten_ko';
import { StreamFlattenDeep } from '@/pages/StreamFlattenDeep';
import { StreamFlattenDeep_ko } from '@/pages/StreamFlattenDeep_ko';
import { StreamMap } from '@/pages/StreamMap';
import { StreamMap_ko } from '@/pages/StreamMap_ko';
import { StreamAppend } from '@/pages/StreamAppend';
import { StreamAppend_ko } from '@/pages/StreamAppend_ko';
import { StreamPrepend } from '@/pages/StreamPrepend';
import { StreamPrepend_ko } from '@/pages/StreamPrepend_ko';
import { StreamReduce } from '@/pages/StreamReduce';
import { StreamReduce_ko } from '@/pages/StreamReduce_ko';
import { StreamScan } from '@/pages/StreamScan';
import { StreamScan_ko } from '@/pages/StreamScan_ko';
import { StreamSome } from '@/pages/StreamSome';
import { StreamSome_ko } from '@/pages/StreamSome_ko';
import { StreamTake } from '@/pages/StreamTake';
import { StreamTake_ko } from '@/pages/StreamTake_ko';
import { StreamRange } from '@/pages/StreamRange';
import { StreamRange_ko } from '@/pages/StreamRange_ko';
import { StreamTakeWhile } from '@/pages/StreamTakeWhile';
import { StreamTakeWhile_ko } from '@/pages/StreamTakeWhile_ko';
import { StreamToArray } from '@/pages/StreamToArray';
import { StreamToArray_ko } from '@/pages/StreamToArray_ko';
import { StreamToAsync } from '@/pages/StreamToAsync';
import { StreamToAsync_ko } from '@/pages/StreamToAsync_ko';
import { StreamZip } from '@/pages/StreamZip';
import { StreamZip_ko } from '@/pages/StreamZip_ko';
import { StreamZipWith } from '@/pages/StreamZipWith';
import { StreamZipWith_ko } from '@/pages/StreamZipWith_ko';
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
import { Ceil } from '@/pages/Ceil';
import { Ceil_ko } from '@/pages/Ceil_ko';
import { Floor } from '@/pages/Floor';
import { Floor_ko } from '@/pages/Floor_ko';
import { Div } from '@/pages/Div';
import { Div_ko } from '@/pages/Div_ko';
import { Sub } from '@/pages/Sub';
import { Sub_ko } from '@/pages/Sub_ko';
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
import { Head } from '@/pages/Head';
import { Head_ko } from '@/pages/Head_ko';
import { Tail } from '@/pages/Tail';
import { Tail_ko } from '@/pages/Tail_ko';
import { Last } from '@/pages/Last';
import { Last_ko } from '@/pages/Last_ko';
import { Init } from '@/pages/Init';
import { Init_ko } from '@/pages/Init_ko';
import { Range } from '@/pages/Range';
import { Range_ko } from '@/pages/Range_ko';
import { Partition } from '@/pages/Partition';
import { Partition_ko } from '@/pages/Partition_ko';
import { FlattenDeep } from '@/pages/FlattenDeep';
import { FlattenDeep_ko } from '@/pages/FlattenDeep_ko';
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
import { Fold } from '@/pages/Fold';
import { Fold_ko } from '@/pages/Fold_ko';
import { GetOrElse } from '@/pages/GetOrElse';
import { GetOrElse_ko } from '@/pages/GetOrElse_ko';
import { MapMaybe } from '@/pages/MapMaybe';
import { MapMaybe_ko } from '@/pages/MapMaybe_ko';
import { Result } from '@/pages/Result';
import { Result_ko } from '@/pages/Result_ko';
import { Assoc } from '@/pages/Assoc';
import { Assoc_ko } from '@/pages/Assoc_ko';
import { AssocPath } from '@/pages/AssocPath';
import { AssocPath_ko } from '@/pages/AssocPath_ko';
import { DissocPath } from '@/pages/DissocPath';
import { DissocPath_ko } from '@/pages/DissocPath_ko';
import { Dissoc } from '@/pages/Dissoc';
import { Dissoc_ko } from '@/pages/Dissoc_ko';
import { Entries } from '@/pages/Entries';
import { Entries_ko } from '@/pages/Entries_ko';
import { Evolve } from '@/pages/Evolve';
import { Evolve_ko } from '@/pages/Evolve_ko';
import { Has } from '@/pages/Has';
import { Has_ko } from '@/pages/Has_ko';
import { HasPath } from '@/pages/HasPath';
import { HasPath_ko } from '@/pages/HasPath_ko';
import { Keys } from '@/pages/Keys';
import { Keys_ko } from '@/pages/Keys_ko';
import { MapValues } from '@/pages/MapValues';
import { MapValues_ko } from '@/pages/MapValues_ko';
import { Merge } from '@/pages/Merge';
import { Merge_ko } from '@/pages/Merge_ko';
import { MergeAll } from '@/pages/MergeAll';
import { MergeAll_ko } from '@/pages/MergeAll_ko';
import { MergeDeep } from '@/pages/MergeDeep';
import { MergeDeep_ko } from '@/pages/MergeDeep_ko';
import { Omit } from '@/pages/Omit';
import { Omit_ko } from '@/pages/Omit_ko';
import { Path } from '@/pages/Path';
import { Path_ko } from '@/pages/Path_ko';
import { PathOr } from '@/pages/PathOr';
import { PathOr_ko } from '@/pages/PathOr_ko';
import { Pick } from '@/pages/Pick';
import { Pick_ko } from '@/pages/Pick_ko';
import { Prop } from '@/pages/Prop';
import { Prop_ko } from '@/pages/Prop_ko';
import { PropStrict } from '@/pages/PropStrict';
import { PropStrict_ko } from '@/pages/PropStrict_ko';
import { PropOr } from '@/pages/PropOr';
import { PropOr_ko } from '@/pages/PropOr_ko';
import { Values } from '@/pages/Values';
import { Values_ko } from '@/pages/Values_ko';
// mapValues 문서가 없는 상태이므로 주석 처리/임포트 제거
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
import { PipeAsyncSideEffect } from '@/pages/PipeAsyncSideEffect';
import { PipeAsyncSideEffect_ko } from '@/pages/PipeAsyncSideEffect_ko';
import { PipeAsyncSideEffectStrict } from '@/pages/PipeAsyncSideEffectStrict';
import { PipeAsyncSideEffectStrict_ko } from '@/pages/PipeAsyncSideEffectStrict_ko';
import { Retry } from '@/pages/Retry';
import { Retry_ko } from '@/pages/Retry_ko';
import { Throttle } from '@/pages/Throttle';
import { Throttle_ko } from '@/pages/Throttle_ko';
import { Add } from '@/pages/Add';
import { Add_ko } from '@/pages/Add_ko';
import { Max } from '@/pages/Max';
import { Max_ko } from '@/pages/Max_ko';
import { Mean } from '@/pages/Mean';
import { Mean_ko } from '@/pages/Mean_ko';
import { Min } from '@/pages/Min';
import { Min_ko } from '@/pages/Min_ko';
import { Mul } from '@/pages/Mul';
import { Mul_ko } from '@/pages/Mul_ko';
import { RandomInt } from '@/pages/RandomInt';
import { RandomInt_ko } from '@/pages/RandomInt_ko';
import { Round } from '@/pages/Round';
import { Round_ko } from '@/pages/Round_ko';
import { Sum } from '@/pages/Sum';
import { Sum_ko } from '@/pages/Sum_ko';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageComponent = () => any;

const normalizeRoute = (path: string) => {
  const cleaned = path.replace(/\/+$/, '');
  return cleaned || '/';
};

const routes: Record<string, PageComponent> = {
  '/': Home,
  '/ko': Home_ko,
  '/guide': Guide,
  '/ko/guide': Guide_ko,
  '/composition/pipe': Pipe,
  '/ko/composition/pipe': Pipe_ko,
  '/composition/pipeSideEffect': PipeSideEffect,
  '/ko/composition/pipeSideEffect': PipeSideEffect_ko,
  '/composition/pipeSideEffectStrict': PipeSideEffectStrict,
  '/ko/composition/pipeSideEffectStrict': PipeSideEffectStrict_ko,
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
  '/composition/from': From,
  '/ko/composition/from': From_ko,
  '/composition/complement': Complement,
  '/ko/composition/complement': Complement_ko,
  '/composition/memoize': Memoize,
  '/ko/composition/memoize': Memoize_ko,
  '/composition/once': Once,
  '/ko/composition/once': Once_ko,
  '/composition/tap': Tap,
  '/ko/composition/tap': Tap_ko,
  '/composition/sideEffect': SideEffect,
  '/ko/composition/sideEffect': SideEffect_ko,
  '/composition/isSideEffect': IsSideEffect,
  '/ko/composition/isSideEffect': IsSideEffect_ko,
  '/composition/matchSideEffect': MatchSideEffect,
  '/ko/composition/matchSideEffect': MatchSideEffect_ko,
  '/composition/runPipeResult': RunPipeResult,
  '/ko/composition/runPipeResult': RunPipeResult_ko,
  '/async/pipeAsync': PipeAsync,
  '/ko/async/pipeAsync': PipeAsync_ko,
  '/async/pipeAsyncSideEffect': PipeAsyncSideEffect,
  '/ko/async/pipeAsyncSideEffect': PipeAsyncSideEffect_ko,
  '/async/pipeAsyncSideEffectStrict': PipeAsyncSideEffectStrict,
  '/ko/async/pipeAsyncSideEffectStrict': PipeAsyncSideEffectStrict_ko,
  '/async/delay': Delay,
  '/ko/async/delay': Delay_ko,
  '/async/timeout': Timeout,
  '/ko/async/timeout': Timeout_ko,
  '/async/retry': Retry,
  '/ko/async/retry': Retry_ko,
  '/async/throttle': Throttle,
  '/ko/async/throttle': Throttle_ko,
  '/math/add': Add,
  '/ko/math/add': Add_ko,
  '/math/sub': Sub,
  '/ko/math/sub': Sub_ko,
  '/math/ceil': Ceil,
  '/ko/math/ceil': Ceil_ko,
  '/math/floor': Floor,
  '/ko/math/floor': Floor_ko,
  '/math/div': Div,
  '/ko/math/div': Div_ko,
  '/math/max': Max,
  '/ko/math/max': Max_ko,
  '/math/mean': Mean,
  '/ko/math/mean': Mean_ko,
  '/math/min': Min,
  '/ko/math/min': Min_ko,
  '/math/mul': Mul,
  '/ko/math/mul': Mul_ko,
  '/math/sum': Sum,
  '/ko/math/sum': Sum_ko,
  '/math/round': Round,
  '/ko/math/round': Round_ko,
  '/math/randomInt': RandomInt,
  '/ko/math/randomInt': RandomInt_ko,
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
  '/stream/chunk': StreamChunk,
  '/ko/stream/chunk': StreamChunk_ko,
  '/stream/concat': StreamConcat,
  '/ko/stream/concat': StreamConcat_ko,
  '/stream/map': StreamMap,
  '/ko/stream/map': StreamMap_ko,
  '/stream/filter': StreamFilter,
  '/ko/stream/filter': StreamFilter_ko,
  '/stream/flatMap': StreamFlatMap,
  '/ko/stream/flatMap': StreamFlatMap_ko,
  '/stream/flatten': StreamFlatten,
  '/ko/stream/flatten': StreamFlatten_ko,
  '/stream/flattenDeep': StreamFlattenDeep,
  '/ko/stream/flattenDeep': StreamFlattenDeep_ko,
  '/stream/range': StreamRange,
  '/ko/stream/range': StreamRange_ko,
  '/stream/take': StreamTake,
  '/ko/stream/take': StreamTake_ko,
  '/stream/takeWhile': StreamTakeWhile,
  '/ko/stream/takeWhile': StreamTakeWhile_ko,
  '/stream/drop': StreamDrop,
  '/ko/stream/drop': StreamDrop_ko,
  '/stream/dropWhile': StreamDropWhile,
  '/ko/stream/dropWhile': StreamDropWhile_ko,
  '/stream/append': StreamAppend,
  '/ko/stream/append': StreamAppend_ko,
  '/stream/prepend': StreamPrepend,
  '/ko/stream/prepend': StreamPrepend_ko,
  '/stream/zip': StreamZip,
  '/ko/stream/zip': StreamZip_ko,
  '/stream/zipWith': StreamZipWith,
  '/ko/stream/zipWith': StreamZipWith_ko,
  '/stream/find': StreamFind,
  '/ko/stream/find': StreamFind_ko,
  '/stream/some': StreamSome,
  '/ko/stream/some': StreamSome_ko,
  '/stream/every': StreamEvery,
  '/ko/stream/every': StreamEvery_ko,
  '/stream/reduce': StreamReduce,
  '/ko/stream/reduce': StreamReduce_ko,
  '/stream/scan': StreamScan,
  '/ko/stream/scan': StreamScan_ko,
  '/stream/toArray': StreamToArray,
  '/ko/stream/toArray': StreamToArray_ko,
  '/stream/toAsync': StreamToAsync,
  '/ko/stream/toAsync': StreamToAsync_ko,
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
  '/array/head': Head,
  '/ko/array/head': Head_ko,
  '/array/tail': Tail,
  '/ko/array/tail': Tail_ko,
  '/array/last': Last,
  '/ko/array/last': Last_ko,
  '/array/init': Init,
  '/ko/array/init': Init_ko,
  '/array/range': Range,
  '/ko/array/range': Range_ko,
  '/array/partition': Partition,
  '/ko/array/partition': Partition_ko,
  '/array/flattenDeep': FlattenDeep,
  '/ko/array/flattenDeep': FlattenDeep_ko,
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
  '/nullable/maybe': Maybe,
  '/ko/nullable/maybe': Maybe_ko,
  '/nullable/fold': Fold,
  '/ko/nullable/fold': Fold_ko,
  '/nullable/getOrElse': GetOrElse,
  '/ko/nullable/getOrElse': GetOrElse_ko,
  '/nullable/mapMaybe': MapMaybe,
  '/ko/nullable/mapMaybe': MapMaybe_ko,
  '/nullable/result': Result,
  '/ko/nullable/result': Result_ko,
  '/object/assoc': Assoc,
  '/ko/object/assoc': Assoc_ko,
  '/object/assocPath': AssocPath,
  '/ko/object/assocPath': AssocPath_ko,
  '/object/dissoc': Dissoc,
  '/ko/object/dissoc': Dissoc_ko,
  '/object/dissocPath': DissocPath,
  '/ko/object/dissocPath': DissocPath_ko,
  '/object/entries': Entries,
  '/ko/object/entries': Entries_ko,
  '/object/evolve': Evolve,
  '/ko/object/evolve': Evolve_ko,
  '/object/has': Has,
  '/ko/object/has': Has_ko,
  '/object/hasPath': HasPath,
  '/ko/object/hasPath': HasPath_ko,
  '/object/keys': Keys,
  '/ko/object/keys': Keys_ko,
  '/object/mapValues': MapValues,
  '/ko/object/mapValues': MapValues_ko,
  '/object/merge': Merge,
  '/ko/object/merge': Merge_ko,
  '/object/mergeAll': MergeAll,
  '/ko/object/mergeAll': MergeAll_ko,
  '/object/mergeDeep': MergeDeep,
  '/ko/object/mergeDeep': MergeDeep_ko,
  '/object/omit': Omit,
  '/ko/object/omit': Omit_ko,
  '/object/path': Path,
  '/ko/object/path': Path_ko,
  '/object/pathOr': PathOr,
  '/ko/object/pathOr': PathOr_ko,
  '/object/pick': Pick,
  '/ko/object/pick': Pick_ko,
  '/object/prop': Prop,
  '/ko/object/prop': Prop_ko,
  '/object/propStrict': PropStrict,
  '/ko/object/propStrict': PropStrict_ko,
  '/object/propOr': PropOr,
  '/ko/object/propOr': PropOr_ko,
  '/object/values': Values,
  '/ko/object/values': Values_ko,
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
