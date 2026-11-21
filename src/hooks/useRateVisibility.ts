import { useEffect, useState } from 'react';

export type RateVisibilitySource = 'url-override' | 'remote-flag' | 'static-default';

export interface RateVisibilityState {
  isVisible: boolean;
  source: RateVisibilitySource;
  isLoading: boolean;
  hasUrlOverride: boolean;
}

export function useRateVisibility(
  defaultPublicVisible: boolean,
  remoteFlagUrl: string
): RateVisibilityState {
  const getUrlOverride = (): boolean | null => {
    if (typeof window === 'undefined') return null;
    const param = new URLSearchParams(window.location.search).get('rates');
    if (param === 'true') return true;
    if (param === 'false') return false;
    return null;
  };

  const initialOverride = getUrlOverride();

  const [state, setState] = useState<RateVisibilityState>(() => {
    if (initialOverride !== null) {
      return {
        isVisible: initialOverride,
        source: 'url-override',
        isLoading: false,
        hasUrlOverride: true,
      };
    }
    return {
      isVisible: defaultPublicVisible,
      source: 'static-default',
      isLoading: Boolean(remoteFlagUrl),
      hasUrlOverride: false,
    };
  });

  useEffect(() => {
    const override = getUrlOverride();
    if (override !== null) {
      setState({
        isVisible: override,
        source: 'url-override',
        isLoading: false,
        hasUrlOverride: true,
      });
      return;
    }

    if (!remoteFlagUrl.trim() || remoteFlagUrl.includes('placeholder-owner')) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 1500);

    fetch(remoteFlagUrl, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Remote flag fetch failed');
        return res.json();
      })
      .then((data: unknown) => {
        if (
          typeof data === 'object' &&
          data !== null &&
          'publicRatesEnabled' in data &&
          typeof (data as { publicRatesEnabled: unknown }).publicRatesEnabled === 'boolean'
        ) {
          setState({
            isVisible: (data as { publicRatesEnabled: boolean }).publicRatesEnabled,
            source: 'remote-flag',
            isLoading: false,
            hasUrlOverride: false,
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      })
      .catch(() => {
        setState((prev) => ({ ...prev, isLoading: false }));
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [defaultPublicVisible, remoteFlagUrl]);

  return state;
}
