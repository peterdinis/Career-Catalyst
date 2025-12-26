import useSWRMutation from 'swr/mutation';

async function generateCoverLetter(url: string, { arg }: { arg: unknown }) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error('Failed to generate');
    }

    return response.json() as Promise<{ letter: string }>;
}

export function useCoverLetter() {
    const { trigger, data, isMutating, error } = useSWRMutation(
        '/api/generate-cover-letter',
        generateCoverLetter
    );

    return {
        generate: trigger,
        letter: data?.letter,
        isGenerating: isMutating,
        error,
    };
}
