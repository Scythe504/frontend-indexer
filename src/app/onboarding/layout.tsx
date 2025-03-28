import type React from "react"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <OnboardingProgress />
        <div className="mt-8">{children}</div>
      </div>
    </div>
  )
}

