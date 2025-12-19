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
import { Flip } from '@/pages/Flip';
import { Flip_ko } from '@/pages/Flip_ko';
import { Identity } from '@/pages/Identity';
import { Identity_ko } from '@/pages/Identity_ko';
import { Memoize } from '@/pages/Memoize';
import { Memoize_ko } from '@/pages/Memoize_ko';

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
  '/composition/flip': Flip,
  '/ko/composition/flip': Flip_ko,
  '/composition/identity': Identity,
  '/ko/composition/identity': Identity_ko,
  '/composition/memoize': Memoize,
  '/ko/composition/memoize': Memoize_ko,
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
