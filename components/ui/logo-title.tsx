import Image from 'next/image'
import Logo from '@/assets/svg/logo.svg'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface LogoTitleProps {
  title: string
  logoSize?: number
  wrapperClassName?: HTMLAttributes<HTMLDivElement>['className']
  titleClassName?: HTMLAttributes<HTMLDivElement>['className']
}

const LogoTitle = ({
  title,
  titleClassName,
  wrapperClassName,
  logoSize = 38,
}: LogoTitleProps) => (
  <div
    className={cn(
      'flex items-center gap-3.5 sm:flex-row flex-col',
      wrapperClassName,
    )}
  >
    <Image
      priority
      src={Logo}
      alt={'logo'}
      style={{
        width: logoSize,
      }}
    />

    <span className={cn('text-4xl font-semibold text-center', titleClassName)}>
      {title}
    </span>
  </div>
)

export default LogoTitle
