import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export const CompletePage = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Setup Complete!</h1>
            <p className="max-w-md text-muted-foreground">
                Your account has been successfully set up. You can now access your dashboard.
            </p>
            <Button asChild size="lg">
                <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
        </div>
    )
}
