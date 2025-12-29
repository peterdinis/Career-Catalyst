import { unstable_cache } from 'next/cache';

export const cachedData = <T>(
    fetcher: () => Promise<T>,
    keys: string[],
    revalidate: number = 3600
) => {
    return unstable_cache(fetcher, keys, {
        revalidate,
    });
};

export async function cachedFetch<T>(
    url: string,
    options?: RequestInit,
    keys: string[] = [],
    revalidate: number = 3600
): Promise<T> {
    const fetcher = async () => {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    };

    return cachedData(fetcher, [...keys, url], revalidate)();
}
