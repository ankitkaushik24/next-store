'use client';

import { useIsLoading } from "./LoadersProvider";

export default function IsLoading({loaderId, children}: {loaderId: string, children: any}) {
    const isLoading = useIsLoading(loaderId);

    return (isLoading || null) && children;
}
