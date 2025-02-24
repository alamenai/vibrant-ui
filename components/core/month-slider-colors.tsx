"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useQueryState } from "nuqs"

import { cn } from "@/lib/utils"
import { useState } from "react"
import tailwindColors from "tailwindcss/colors"

const getColors = () => {
  const excludedColors = [
    "inherit",
    "transparent",
    "current",
    "white",
    "black",
    "coolGray",
    "blueGray",
    "lightBlue",
    "warmGray",
    "trueGray",
  ]

  return Object.keys(tailwindColors)
    .filter((color) => !excludedColors.includes(color))
    .map((color) => ({
      value: color,
      label: color
        .slice(0, 1)
        .toUpperCase()
        .concat(color.slice(1, color.length)),
    }))
}
export const MonthSliderColors = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useQueryState("color")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="absolute top-4 left-4">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between"
        >
          {value
            ? getColors().find((color) => color.value === value)?.label
            : "Select Color"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {getColors().map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
