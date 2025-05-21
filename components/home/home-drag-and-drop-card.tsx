import React, { useCallback } from 'react'
import FolderWithPdfs from '@/assets/svg/home/folder-with-pdfs.svg'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface HomeDragAndDropCardProps {
  onSubmitFile: (file: File) => void
}

const HomeDragAndDropCard = ({ onSubmitFile }: HomeDragAndDropCardProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return
      }

      const file = acceptedFiles[0]

      onSubmitFile(file)
    },
    [onSubmitFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    multiple: false,
    onDropRejected: () => {
      toast('Please upload a valid PDF file')
    },
  })

  return (
    <Card
      className="w-full shadow-none p-5 border-gray-300/40 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer"
      {...getRootProps()}
    >
      <div
        className={cn(
          'rounded-sm border-dashed border-2 sm:px-16 px-5 py-20 transition-colors',
          isDragActive
            ? 'border-drag-border-active bg-blue-50'
            : 'border-gray-300/40',
        )}
      >
        <input {...getInputProps()} />

        <CardHeader className="flex items-center justify-center mb-10">
          <Image
            priority
            src={FolderWithPdfs}
            alt="FolderWithPdfs"
            className="w-[92px]"
          />
        </CardHeader>

        <CardContent className="flex items-center justify-center flex-col gap-2 text-center px-0">
          <p className="text-xl text-gray-400">
            <span className="text-primary font-semibold">Click to upload</span>{' '}
            or drag and drop files
          </p>

          <p className="text-gray-400">
            Drop Course Materials and start generating - for{' '}
            <span className="font-semibold">FREE</span>
          </p>
        </CardContent>
      </div>
    </Card>
  )
}

export { HomeDragAndDropCard }
