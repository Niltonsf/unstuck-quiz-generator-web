import React from 'react'
import { Header } from '../layout/header'
import { ChevronLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const ReviewHeader = () => {
  const router = useRouter()

  return (
    <Header
      left={
        <Button
          variant={'ghost'}
          className="text-primary gap-1.5 hover:bg-transparent"
          onClick={() => router.push('/')}
        >
          <ChevronLeft />
          Back
        </Button>
      }
      right={<></>}
    />
  )
}

export { ReviewHeader }
