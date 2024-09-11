import { cn } from '@/lib/utils'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/shared/shadcn/input-otp'
import { memo } from 'react'

export const Otp = memo(({ className }: { className?: string }) => {
  return (
    <InputOTP maxLength={6} className={cn(' ml-8', className)}>
      <InputOTPGroup>
        {[0, 1, 2].map(index => (
          <InputOTPSlot
            key={index}
            index={index}
            className=" w-20 h-24 text-3xl"
          />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {[3, 4, 5].map(index => (
          <InputOTPSlot
            key={index}
            index={index}
            className=" w-20 h-24 text-3xl"
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
},
)
