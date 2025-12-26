import { auth } from '@/auth';
import { db } from '@/db';
import { resumes, coverLetters } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FileText, Sparkles, Calendar } from 'lucide-react';

async function getResumes(userId: string) {
    return db
        .select()
        .from(resumes)
        .where(eq(resumes.userId, userId))
        .orderBy(desc(resumes.createdAt));
}

async function getCoverLetters(userId: string) {
    return db
        .select()
        .from(coverLetters)
        .where(eq(coverLetters.userId, userId))
        .orderBy(desc(coverLetters.createdAt));
}

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect('/login');
    }

    const [userResumes, userCoverLetters] = await Promise.all([
        getResumes(session.user.id),
        getCoverLetters(session.user.id),
    ]);

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
                <p className="text-muted-foreground">
                    Manage your saved resumes and cover letters.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Resumes Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <FileText className="h-6 w-6 text-blue-500" />
                            Saved Resumes
                        </h2>
                        <Link
                            href="/resume-optimizer"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Create New
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {userResumes.length === 0 ? (
                            <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-muted-foreground">
                                No resumes saved yet.
                            </div>
                        ) : (
                            userResumes.map((resume) => (
                                <div
                                    key={resume.id}
                                    className="glass-card p-6 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg">
                                            {resume.title}
                                        </h3>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(
                                                resume.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        Analysis Score:{' '}
                                        {JSON.parse(resume.content).score}/100
                                    </p>
                                    <button className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Analysis &rarr;
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Cover Letters Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-purple-500" />
                            Cover Letters
                        </h2>
                        <Link
                            href="/cover-letter"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Create New
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {userCoverLetters.length === 0 ? (
                            <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-muted-foreground">
                                No cover letters saved yet.
                            </div>
                        ) : (
                            userCoverLetters.map((letter) => (
                                <div
                                    key={letter.id}
                                    className="glass-card p-6 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg">
                                            {letter.title}
                                        </h3>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(
                                                letter.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                        {letter.companyName ||
                                            'Unknown Company'}
                                    </p>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        {letter.content}
                                    </p>
                                    <button className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Letter &rarr;
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
