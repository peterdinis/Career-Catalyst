'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { resumes } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function saveResume(title: string, content: string) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: 'Unauthorized' };
    }

    try {
        await db.insert(resumes).values({
            userId: session.user.id,
            title,
            content: JSON.stringify(content),
        });

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Failed to save resume:', error);
        return { error: 'Failed to save resume' };
    }
}
