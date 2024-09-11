import { Moon, Sun } from 'lucide-react'
import { memo } from 'react'
import { Button } from '../../shadcn/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '../../shadcn/dropdown-menu'
import { useTheme } from '../ThemeProvider/ThemeProvider'

interface Props {
  className?: string
}

export const ModeToggle = memo(({ className }: Props) => {
  const { setTheme, theme } = useTheme()

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            size="icon"
            onClick={() =>
              theme === 'dark' ? setTheme('light') : setTheme('dark')}
          >
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  )
})
