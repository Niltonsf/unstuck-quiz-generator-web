'use client'

import React from 'react'
import { motion } from 'framer-motion'
import UploadingQuiz from '@/assets/svg/uploading-quiz.svg'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

interface LoadingOverlayProps {
  title: string
  subtitle: string
  onAnimationEnd?: () => void
}

const LoadingOverlay = ({
  title,
  subtitle,
  onAnimationEnd,
}: LoadingOverlayProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center flex-col text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={(a: { opacity: number }) => {
        const opacity = a?.opacity

        if (opacity === 0) {
          onAnimationEnd?.()
        }
      }}
    >
      <Image
        priority
        src={UploadingQuiz}
        alt="Logo"
        className="sm:w-[446px] w-80 mb-20"
      />

      <p className="font-semibold sm:text-4xl text-3xl mb-3">{title}</p>

      <p className="sm:text-lg text-base text-gray-500">{subtitle}</p>

      <Loader2 className="animate-spin mt-5" />
    </motion.div>
  )
}

export default LoadingOverlay
