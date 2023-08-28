'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type LoadingType = <T>(deferFn: () => Promise<T>, loaderId: string) => Promise<T>;

const LoadersContext = createContext<{loading: LoadingType, state: Record<string, number>}>({});

export function LoadersProvider({ children }: {children: React.ReactNode}) {
  const [state, setState] = useState<Record<string, number>>({});
  const loading = useCallback(triggerLoading, []);

  function triggerLoading<T>(deferFn: () => Promise<T>, loaderId: string) {
    updateLoaders(loaderId, 1)
    return deferFn().finally(() => {
      updateLoaders(loaderId, -1);
  });
    
  }

  function updateLoaders(loaderId: string, amount: number) {
    setState(loaders => ({
      ...loaders,
      [loaderId]: (loaders[loaderId] || 0) + amount,
    }))
  }

  return (
    <LoadersContext.Provider value={{state, loading}}>
      {children}
    </LoadersContext.Provider>
  );
}

export function useIsLoading(loaderId: string): boolean {
  const {state} =  useContext(LoadersContext);
  return useMemo(() => state[loaderId] > 0, [loaderId, state]);
}

export function useLoading() {
  const {loading} = useContext(LoadersContext);
  return loading;
}