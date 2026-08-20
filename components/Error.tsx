'use client'

import { useEffect } from 'react'
import { GradientButton } from '@/components/gradient-button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAF7F2]">
      <div className="text-center max-w-lg">
        <h2 className="oh-headline text-4xl mb-4 text-[#4a4640]">
          Something went wrong
        </h2>
        <p className="oh-body text-[#6B6560] mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <GradientButton onClick={reset}>
          Try Again
        </GradientButton>
      </div>
    </div>
  )
}