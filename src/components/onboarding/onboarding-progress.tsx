"use client"

import { usePathname } from "next/navigation"
import { Check } from "lucide-react"

const steps = [
  { id: "account", label: "Account", path: "/auth" },
  { id: "database", label: "Database", path: "/onboarding/database" },
  { id: "webhook", label: "Webhook", path: "/onboarding/webhook" },
  { id: "complete", label: "Complete", path: "/onboarding/complete" },
]

export function OnboardingProgress() {
  const pathname = usePathname()

  const currentStepIndex = steps.findIndex(
    (step) => pathname === step.path || (pathname === "/auth" && step.id === "account"),
  )

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`
              flex h-10 w-10 items-center justify-center rounded-full border-2
              ${
                index <= currentStepIndex
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 text-muted-foreground/30"
              }
            `}
            >
              {index < currentStepIndex ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
            </div>
            <span
              className={`mt-2 text-sm ${index <= currentStepIndex ? "text-foreground" : "text-muted-foreground/50"}`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-4">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted-foreground/30" />
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-300"
          style={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

