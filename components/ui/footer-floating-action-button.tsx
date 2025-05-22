import { Button } from '@/components/ui/button'

interface FloatingActionButtonProps {
  label: string
  onClick: () => void
  buttonProps?: React.ComponentProps<typeof Button>
}

export const FooterFloatingActionButton = ({
  label,
  onClick,
  buttonProps,
}: FloatingActionButtonProps) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/100 to-transparent pointer-events-none z-10" />

      <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-20">
        <Button size="lg" className="px-8" onClick={onClick} {...buttonProps}>
          {label}
        </Button>
      </div>
    </>
  )
}
