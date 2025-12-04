import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center px-4">
            <h2 className="text-4xl font-bold">404</h2>
            <p className="text-xl text-muted-foreground">Page not found</p>
            <Link href="/" className="text-primary hover:underline mt-4">
                Return Home
            </Link>
        </div>
    )
}
