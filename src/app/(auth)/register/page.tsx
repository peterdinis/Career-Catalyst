'use client';

import { register } from '@/app/actions/auth';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Schema validation using Zod
const registerSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .min(2, { message: 'Name must be at least 2 characters' })
        .max(50, { message: 'Name must be less than 50 characters' }),
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Please enter a valid email address' }),
    password: z
        .string()
        .min(1, { message: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter',
        })
        .regex(/[a-z]/, {
            message: 'Password must contain at least one lowercase letter',
        })
        .regex(/[0-9]/, {
            message: 'Password must contain at least one number',
        }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        setError,
        clearErrors,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsSubmitting(true);
        setServerError(null);
        clearErrors();

        try {
            // Convert form data to FormData for server action
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);

            const result = await register(formData);

            if (result?.error) {
                // Handle specific errors
                if (
                    result.error.includes('email') ||
                    result.error.includes('Email')
                ) {
                    setError('email', {
                        type: 'manual',
                        message: 'This email is already registered',
                    });
                } else {
                    setError('root', {
                        type: 'manual',
                        message:
                            result.error ||
                            'Registration failed. Please try again.',
                    });
                }
            } else {
                // Registration successful - redirect to login
                router.push('/login?registered=true');
            }
        } catch (err) {
            setError('root', {
                type: 'manual',
                message: 'An unexpected error occurred. Please try again.',
            });
            console.error('Registration error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md">
                <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl dark:bg-gray-800/80">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Join Our Community
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Create your account to get started
                        </p>
                    </div>

                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    className={`block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-all duration-200 dark:bg-gray-700/50 dark:text-white ${
                                        errors.name
                                            ? 'ring-red-500 focus:ring-red-500 dark:ring-red-500'
                                            : 'ring-gray-300 focus:ring-indigo-600 dark:ring-gray-600'
                                    }`}
                                    placeholder="John Doe"
                                    {...formRegister('name')}
                                    aria-invalid={
                                        errors.name ? 'true' : 'false'
                                    }
                                    aria-describedby={
                                        errors.name ? 'name-error' : undefined
                                    }
                                />
                            </div>
                            {errors.name && (
                                <p
                                    id="name-error"
                                    className="text-sm text-red-500 flex items-center gap-1"
                                >
                                    <span className="text-xs">⚠</span>{' '}
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className={`block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-all duration-200 dark:bg-gray-700/50 dark:text-white ${
                                        errors.email
                                            ? 'ring-red-500 focus:ring-red-500 dark:ring-red-500'
                                            : 'ring-gray-300 focus:ring-indigo-600 dark:ring-gray-600'
                                    }`}
                                    placeholder="you@example.com"
                                    {...formRegister('email')}
                                    aria-invalid={
                                        errors.email ? 'true' : 'false'
                                    }
                                    aria-describedby={
                                        errors.email ? 'email-error' : undefined
                                    }
                                />
                            </div>
                            {errors.email && (
                                <p
                                    id="email-error"
                                    className="text-sm text-red-500 flex items-center gap-1"
                                >
                                    <span className="text-xs">⚠</span>{' '}
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    className={`block w-full rounded-lg border-0 px-4 py-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-all duration-200 dark:bg-gray-700/50 dark:text-white ${
                                        errors.password
                                            ? 'ring-red-500 focus:ring-red-500 dark:ring-red-500'
                                            : 'ring-gray-300 focus:ring-indigo-600 dark:ring-gray-600'
                                    }`}
                                    placeholder="Create a strong password"
                                    {...formRegister('password')}
                                    aria-invalid={
                                        errors.password ? 'true' : 'false'
                                    }
                                    aria-describedby={
                                        errors.password
                                            ? 'password-error'
                                            : undefined
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {/* Password Requirements */}
                            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 pl-1">
                                <p>Password must contain:</p>
                                <ul className="list-disc list-inside space-y-0.5">
                                    <li
                                        className={
                                            errors.password?.message?.includes(
                                                'uppercase'
                                            )
                                                ? 'text-red-500'
                                                : ''
                                        }
                                    >
                                        At least one uppercase letter
                                    </li>
                                    <li
                                        className={
                                            errors.password?.message?.includes(
                                                'lowercase'
                                            )
                                                ? 'text-red-500'
                                                : ''
                                        }
                                    >
                                        At least one lowercase letter
                                    </li>
                                    <li
                                        className={
                                            errors.password?.message?.includes(
                                                'number'
                                            )
                                                ? 'text-red-500'
                                                : ''
                                        }
                                    >
                                        At least one number
                                    </li>
                                    <li
                                        className={
                                            errors.password?.message?.includes(
                                                '6 characters'
                                            )
                                                ? 'text-red-500'
                                                : ''
                                        }
                                    >
                                        Minimum 6 characters
                                    </li>
                                </ul>
                            </div>

                            {errors.password && (
                                <p
                                    id="password-error"
                                    className="text-sm text-red-500 flex items-center gap-1 mt-2"
                                >
                                    <span className="text-xs">⚠</span>{' '}
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Server Error */}
                        {errors.root && (
                            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                                    {errors.root.message}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || !isDirty || !isValid}
                            className="group relative flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-green-500 hover:to-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Terms and Conditions */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            By creating an account, you agree to our{' '}
                            <Link
                                href="/terms"
                                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="/privacy"
                                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                                Privacy Policy
                            </Link>
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white/80 px-2 text-gray-500 dark:bg-gray-800/80 dark:text-gray-400">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                Sign in to existing account
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Demo Info */}
                    <div className="mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                        <p className="text-xs text-blue-700 dark:text-blue-400 text-center">
                            💡 Tip: Use a strong password with letters, numbers,
                            and special characters
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
