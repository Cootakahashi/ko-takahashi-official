// Extend Window for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Lightweight client-side router
 * No external dependencies. Uses History API directly.
 *
 * Supports:
 * - pushState navigation (URL changes without reload)
 * - popstate (browser back/forward)
 * - Initial path resolution on page load
 * - Query parameter preservation (?lang=en)
 */

export type RoutePath = '/' | '/story' | '/schedule' | '/articles';

export interface RouteState {
  view: string;
  articleId?: string;
}

const ROUTE_MAP: Record<string, string> = {
  '/': 'home',
  '/story': 'story',
  '/schedule': 'schedule',
  '/articles': 'articles',
  '/about': 'about',
  '/links': 'links',
};

const VIEW_MAP: Record<string, string> = {
  home: '/',
  story: '/story',
  schedule: '/schedule',
  articles: '/articles',
  article_detail: '/articles',
  about: '/about',
  links: '/links',
};

/**
 * Resolve current URL path to a view state
 */
export function resolveRoute(): RouteState {
  const path = window.location.pathname;
  const view = ROUTE_MAP[path] || 'home';
  return { view };
}

/**
 * Navigate to a new view, updating the URL and sending GA4 page_view
 */
export function navigateTo(view: string, articleId?: string): void {
  const path = VIEW_MAP[view] || '/';
  const currentLang = new URLSearchParams(window.location.search).get('lang');
  const search = currentLang ? `?lang=${currentLang}` : '';

  const newUrl = `${path}${search}`;

  if (window.location.pathname + window.location.search !== newUrl) {
    window.history.pushState({ view, articleId }, '', newUrl);

    // Send GA4 virtual page view for SPA navigation
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: newUrl,
        page_title: document.title,
      });
    }
  }
}

/**
 * Subscribe to popstate (back/forward navigation)
 * Returns unsubscribe function
 */
export function onPopState(callback: (state: RouteState) => void): () => void {
  const handler = (event: PopStateEvent) => {
    if (event.state?.view) {
      callback(event.state);
    } else {
      callback(resolveRoute());
    }
  };

  window.addEventListener('popstate', handler);
  return () => window.removeEventListener('popstate', handler);
}

/**
 * Get initial language from URL query parameter
 */
export function getInitialLang(): string | null {
  return new URLSearchParams(window.location.search).get('lang');
}

/**
 * Update the lang query parameter without changing the path
 */
export function updateLangParam(lang: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState(window.history.state, '', url.toString());
}
