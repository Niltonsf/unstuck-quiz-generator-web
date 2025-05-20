import { cn } from '@/lib/utils'

interface DualProgressBarLegendProps {
  color: string
  label: string
}

export const DualProgressBarLegend = ({
  color,
  label,
}: DualProgressBarLegendProps) => (
  <div className="flex font-medium gap-1.5 items-center">
    <div className={cn('w-4 h-4 rounded-full', color)} />
    <span>{label}</span>
  </div>
)
