import { cn } from '@/lib/utils'

interface ScoreBarLegendProps {
  color: string
  label: string
}

export const ScoreBarLegend = ({ color, label }: ScoreBarLegendProps) => (
  <div className="flex font-medium gap-1.5 items-center">
    <div className={cn('w-4 h-4 rounded-full', color)} />
    <span>{label}</span>
  </div>
)
