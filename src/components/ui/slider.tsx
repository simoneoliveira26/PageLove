import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils"

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  min?: number
  max?: number
  step?: number
}

const LoopingSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, min = 0, max = 100, step = 1, ...props }, ref) => {
  const [value, setValue] = React.useState<number[]>([min])

  const handleValueChange = (val: number[]) => {
    setValue(val)
  }

  const handleValueCommit = (val: number[]) => {
    if (val[0] >= max) {
      setValue([min]) // volta para o início
    } else {
      setValue(val)
    }
  }

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
})
LoopingSlider.displayName = SliderPrimitive.Root.displayName

export { LoopingSlider as Slider }
