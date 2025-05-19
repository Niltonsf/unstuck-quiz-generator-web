import React from 'react'
import UploadingQuiz from '@/assets/svg/uploading-quiz.svg'
import Image from 'next/image'

interface LoadingOverlayProps {
  title: string
  subtitle: string
}

const LoadingOverlay = ({ title, subtitle }: LoadingOverlayProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center">
      <Image
        priority
        src={UploadingQuiz}
        alt="Logo"
        className="sm:w-[446px] w-80 mb-20"
      />

      <p className="font-semibold sm:text-4xl text-3xl mb-3">{title}</p>

      <p className="sm:text-lg text-base text-gray-500">{subtitle}</p>
    </div>
  )
}

export default LoadingOverlay
