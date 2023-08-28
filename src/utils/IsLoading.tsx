'use client';

import { useIsLoading } from "./LoadersProvider";

export default function IsLoading({loaderId, children}: {loaderId: string, children: React.ReactNode}) {
    const isLoading = useIsLoading(loaderId);

    return isLoading && children;
}
