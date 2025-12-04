import { unstable_cache } from "next/cache";

// Helper to cache async functions (DB calls, API fetches)
export const cachedData = <T>(
    fetcher: () => Promise<T>,
    keys: string[],
    revalidate: number = 3600 // 1 hour default
) => {
    return unstable_cache(fetcher, keys, {
        revalidate,
    });
};

// Example usage wrapper for fetch
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

