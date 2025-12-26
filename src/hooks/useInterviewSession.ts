import useSWRMutation from 'swr/mutation';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    feedback?: unknown;
}

async function sendInterviewMessage(
    url: string,
    { arg }: { arg: { messages: Message[]; config: unknown } }
) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return response.json();
}

export function useInterviewSession() {
    const { trigger, data, isMutating, error } = useSWRMutation(
        '/api/interview-chat',
        sendInterviewMessage
    );

    return {
        sendMessage: trigger,
        lastResponse: data,
        isSending: isMutating,
        error,
    };
}
