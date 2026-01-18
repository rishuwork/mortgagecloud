import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <div className="text-center max-w-md px-4">
                <h1 className="font-display text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                    Page Not Found
                </h2>
                <p className="text-muted-foreground mb-8">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back on track.
                </p>
                <Button asChild variant="cta" size="lg">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
}
