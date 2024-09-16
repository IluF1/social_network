import arrowBlack from '@/app/assets/images/arrow_back_black.svg'
import arrowWhite from '@/app/assets/images/arrow_back_white.svg'
import { cn } from '@/lib/utils'

import { memo } from 'react'
import { Title } from './Title/Title'
import { ArrowLeft } from 'lucide-react'

interface Props {
  className?: string
  backEvent: () => void
}

export const BackButton = memo(({ className, backEvent }: Props) => {

 
  return (
    <div
      className={cn('flex items-center cursor-pointer', className)}
      onClick={backEvent}
    >
      <ArrowLeft/>
      <Title tag="h3" className=" ml-2">
        Назад
      </Title>
    </div>
  )
})
