import { mount } from 'lithent';
import { appStore, navigateTo } from '@/store';

export const Sidebar = mount(renew => {
  const store = appStore.watch(renew);

  return () => {
    const isKorean = store.route.startsWith('/ko');

    const navItems = [
      {
        title: isKorean ? '시작하기' : 'Getting Started',
        items: [
          { title: isKorean ? '소개' : 'Introduction', path: '/' },
        ],
      },
      {
        title: isKorean ? '조합' : 'Composition',
        items: [
          { title: 'pipe', path: '/composition/pipe' },
          { title: 'compose', path: '/composition/compose' },
          { title: 'curry', path: '/composition/curry' },
          { title: 'partial', path: '/composition/partial' },
          { title: 'flip', path: '/composition/flip' },
          { title: 'identity', path: '/composition/identity' },
          { title: 'constant', path: '/composition/constant' },
          { title: 'memoize', path: '/composition/memoize' },
          { title: 'once', path: '/composition/once' },
          { title: 'tap', path: '/composition/tap' },
        ],
      },
      {
        title: isKorean ? '제어' : 'Control',
        items: [
          { title: 'when', path: '/control/when' },
          { title: 'unless', path: '/control/unless' },
          { title: 'ifElse', path: '/control/ifElse' },
          { title: 'guard', path: '/control/guard' },
          { title: 'tryCatch', path: '/control/tryCatch' },
          { title: 'cond', path: '/control/cond' },
        ],
      },
      {
        title: isKorean ? '디버그' : 'Debug',
        items: [
          { title: 'assert', path: '/debug/assert' },
          { title: 'invariant', path: '/debug/invariant' },
          { title: 'log', path: '/debug/log' },
        ],
      },
      {
        title: isKorean ? '비동기' : 'Async',
        items: [
          { title: 'pipeAsync', path: '/async/pipeAsync' },
          { title: 'delay', path: '/async/delay' },
          { title: 'debounce', path: '/async/debounce' },
          { title: 'debounceLeading', path: '/async/debounceLeading' },
          { title: 'debounceLeadingTrailing', path: '/async/debounceLeadingTrailing' },
        ],
      },
      {
        title: isKorean ? '동등성' : 'Equality',
        items: [
          { title: 'includes', path: '/equality/includes' },
          { title: 'isType', path: '/equality/isType' },
          { title: 'isNil', path: '/equality/isNil' },
          { title: 'isEmpty', path: '/equality/isEmpty' },
          { title: 'clamp', path: '/equality/clamp' },
          { title: 'equals', path: '/equality/equals' },
          { title: 'gt', path: '/equality/gt' },
          { title: 'gte', path: '/equality/gte' },
          { title: 'lt', path: '/equality/lt' },
          { title: 'lte', path: '/equality/lte' },
        ],
      },
      {
        title: isKorean ? '배열' : 'Array',
        items: [
          { title: 'chunk', path: '/array/chunk' },
          { title: 'drop', path: '/array/drop' },
          { title: 'every', path: '/array/every' },
          { title: 'map', path: '/array/map' },
          { title: 'filter', path: '/array/filter' },
          { title: 'find', path: '/array/find' },
          { title: 'flatMap', path: '/array/flatMap' },
          { title: 'groupBy', path: '/array/groupBy' },
          { title: 'reduce', path: '/array/reduce' },
          { title: 'some', path: '/array/some' },
          { title: 'sort', path: '/array/sort' },
          { title: 'sortBy', path: '/array/sortBy' },
          { title: 'take', path: '/array/take' },
          { title: 'uniq', path: '/array/uniq' },
          { title: 'uniqBy', path: '/array/uniqBy' },
          { title: 'unzip', path: '/array/unzip' },
          { title: 'zip', path: '/array/zip' },
          { title: 'zipIndex', path: '/array/zipIndex' },
        ],
      },
      {
        title: isKorean ? '문자열' : 'String',
        items: [
          { title: 'startsWith', path: '/string/startsWith' },
          { title: 'endsWith', path: '/string/endsWith' },
          { title: 'toLower', path: '/string/toLower' },
          { title: 'toUpper', path: '/string/toUpper' },
          { title: 'trim', path: '/string/trim' },
          { title: 'join', path: '/string/join' },
          { title: 'match', path: '/string/match' },
          { title: 'replace', path: '/string/replace' },
          { title: 'split', path: '/string/split' },
        ],
      },
      {
        title: 'Maybe',
        items: [
          { title: 'maybe', path: '/maybe/maybe' },
        ],
      },
    ];

    return (
      <>
        {/* Mobile overlay */}
        {store.sidebarOpen && (
          <div
            class="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => {
              store.sidebarOpen = false;
            }}
          />
        )}

        {/* Sidebar */}
        <aside
          class={`
            fixed md:sticky top-16 left-0 z-50 md:z-auto
            w-64 h-[calc(100vh-4rem)]
            flex-shrink-0 border-r border-gray-200 dark:border-gray-800
            bg-white dark:bg-[#1b1b1f] overflow-y-auto
            transition-transform duration-300 ease-in-out
            ${store.sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <nav class="p-6 space-y-8">
            {navItems.map(section => (
              <div key={section.title}>
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {section.title}
                </h3>
                <ul class="space-y-2">
                  {section.items.map(item => {
                    const isActive = store.route === item.path || store.route === `/ko${item.path}`;
                    return (
                      <li key={item.path}>
                        <a
                          href={item.path}
                          onClick={(e: Event) => {
                            e.preventDefault();
                            navigateTo(item.path);
                            store.sidebarOpen = false; // Close sidebar on mobile after navigation
                          }}
                          class={`block px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
      </>
    );
  };
});
