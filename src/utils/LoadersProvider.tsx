'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LoadersContext = createContext<Record<string, number>>({});

export function LoadersProvider({ children }: {children: React.ReactNode}) {
  const [state, setState] = useState<Record<string, number>>({});

  useEffect(() => {
    if(!('loading' in Promise.prototype)) {
      Object.defineProperty(Promise.prototype, "loading", {
        value: function (loaderId: string) {
          updateLoaders(loaderId, 1)
          return this.finally(() => {
              updateLoaders(loaderId, -1);
          });
        },
      });
    }
  }, [])

  function updateLoaders(loaderId: string, amount: number) {
    setState(loaders => ({
      ...loaders,
      [loaderId]: (loaders[loaderId] || 0) + amount,
    }))
  }

  return (
    <LoadersContext.Provider value={state}>
      {children}
    </LoadersContext.Provider>
  );
}

export function useIsLoading(loaderId: string): boolean {
  const loaders =  useContext(LoadersContext);
  return useMemo(() => loaders[loaderId] > 0, [loaderId, loaders]);
}