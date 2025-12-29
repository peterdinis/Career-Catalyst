'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    User,
    Bot,
    ThumbsUp,
    AlertCircle,
    Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInterviewSession } from '@/hooks/useInterviewSession';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    feedback?: {
        strengths: string[];
        improvements: string[];
        betterAnswer: string;
        score: number;
    };
}

interface InterviewSessionProps {
    config: {
        role: string;
        companyType: string;
        round: string;
    };
}

export function InterviewSession({ config }: InterviewSessionProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { sendMessage, isSending } = useInterviewSession();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initial greeting
    useEffect(() => {
        const startSession = async () => {
            try {
                const data = await sendMessage({ messages: [], config });
                setMessages([{ role: 'assistant', content: data.message }]);
            } catch (error) {
                console.error('Failed to start session', error);
            }
        };
        startSession();
    }, [config, sendMessage]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        try {
            const data = await sendMessage({
                messages: [...messages, userMessage],
                config,
            });

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.message,
                feedback: data.feedback,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    return (
        <div className="flex flex-col h-175 w-full max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold">{config.role} Interview</h2>
                    <p className="text-xs text-muted-foreground">
                        {config.companyType} • {config.round}
                    </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    Live Session
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                    <div key={idx} className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                'flex gap-4 max-w-[80%]',
                                msg.role === 'user'
                                    ? 'ml-auto flex-row-reverse'
                                    : ''
                            )}
                        >
                            <div
                                className={cn(
                                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                                    msg.role === 'user'
                                        ? 'bg-primary'
                                        : 'bg-white/10'
                                )}
                            >
                                {msg.role === 'user' ? (
                                    <User className="h-4 w-4 text-white" />
                                ) : (
                                    <Bot className="h-4 w-4 text-white" />
                                )}
                            </div>
                            <div
                                className={cn(
                                    'p-4 rounded-2xl text-sm leading-relaxed',
                                    msg.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white/5 border border-white/10 rounded-tl-none'
                                )}
                            >
                                {msg.content}
                            </div>
                        </motion.div>

                        {/* Feedback Block (Only for assistant messages that have feedback on previous user answer) */}
                        {msg.role === 'assistant' && msg.feedback && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mx-12 p-4 rounded-xl bg-white/5 border border-white/10 text-sm space-y-3"
                            >
                                <div className="flex items-center gap-2 text-primary font-medium border-b border-white/10 pb-2 mb-2">
                                    <Lightbulb className="h-4 w-4" /> Feedback
                                    on your answer
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-green-400 flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider">
                                            <ThumbsUp className="h-3 w-3" />{' '}
                                            What Worked
                                        </p>
                                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                                            {msg.feedback.strengths.map(
                                                (s, i) => (
                                                    <li key={i}>{s}</li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-yellow-400 flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider">
                                            <AlertCircle className="h-3 w-3" />{' '}
                                            Improvements
                                        </p>
                                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                                            {msg.feedback.improvements.map(
                                                (s, i) => (
                                                    <li key={i}>{s}</li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-3 rounded-lg">
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                                        Better Answer Example:
                                    </p>
                                    <p className="text-xs italic text-white/80">
                                        "{msg.feedback.betterAnswer}"
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                ))}

                {isSending && (
                    <div className="flex gap-4 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                            <div
                                className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                                style={{ animationDelay: '0ms' }}
                            />
                            <div
                                className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                                style={{ animationDelay: '150ms' }}
                            />
                            <div
                                className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                                style={{ animationDelay: '300ms' }}
                            />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your answer..."
                        className="flex-1 bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled={isSending}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isSending}
                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
