import arrowBlack from '@/app/assets/images/arrow_back_black.svg'
import arrowWhite from '@/app/assets/images/arrow_back_white.svg'
import { cn } from '@/lib/utils'

import { memo } from 'react'
import { Title } from './Title/Title'

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
      <img src={arrowWhite} alt="back" />
      <Title tag="h4" className="uppercase ml-2">
        Назад
      </Title>
    </div>
  )
})
