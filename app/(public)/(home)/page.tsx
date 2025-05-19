'use client'

import React, { useState } from 'react'
import { HomeDragAndDropCard } from '@/components/home/home-drag-and-drop-card'
import LoadingOverlay from '@/components/layout/loading-overlay'
import { toast } from 'sonner'
import LogoTitle from '@/components/ui/logo-title'
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const route = useRouter()
  const [uploading, setUploading] = useState(false)

  const onSubmitFile = async (file: File) => {
    try {
      setUploading(true)

      await new Promise((resolve) => setTimeout(resolve, 5000))

      route.push('/review')
    } catch {
      toast('Something went wrong, please try again')
    } finally {
      setUploading(false)
    }
  }

  if (uploading) {
    return (
      <LoadingOverlay
        title={'Generating Quiz Questions'}
        subtitle={'Reading your materials...'}
      />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[700px] mx-5">
        <div className="flex items-center flex-col gap-3.5 mb-7">
          <LogoTitle title="Unstuck Quiz Generator" />

          <span className="text-muted-foreground max-w-[542px] text-center">
            Generate quiz quiz your course materials, or textbooks to help you
            study faster and smarter.
          </span>
        </div>

        <HomeDragAndDropCard onSubmitFile={onSubmitFile} />
      </div>
    </div>
  )
}

export default HomePage
