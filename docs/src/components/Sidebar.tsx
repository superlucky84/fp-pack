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
          { title: 'flip', path: '/composition/flip' },
          { title: 'identity', path: '/composition/identity' },
          { title: 'memoize', path: '/composition/memoize' },
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
