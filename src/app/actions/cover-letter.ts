'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { coverLetters } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function saveCoverLetter(
    title: string,
    content: string,
    jobDescription?: string,
    companyName?: string
) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: 'Unauthorized' };
    }

    try {
        await db.insert(coverLetters).values({
            userId: session.user.id,
            title,
            content,
            jobDescription,
            companyName,
        });

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Failed to save cover letter:', error);
        return { error: 'Failed to save cover letter' };
    }
}
