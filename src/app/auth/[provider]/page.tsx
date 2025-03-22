'use client'
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function LoginPage() {
    const pathName = usePathname();
    const router = useRouter()

    const handler = ()=> {
        router.push(`http://localhost:8080/${pathName}`)
    }

    return <div className="h-screen w-screen flex items-center justify-center bg-zinc-900">
        <Button
            variant={
                "secondary"
            }
           onClick={handler} 
        >  
            Login with Google
        </Button>
    </div>
}