import { BackButton } from '@/shared/ui/BackButton'
import styles from './CreatePost.module.css'

interface Props {
    className?: string
    backEvent: () => void
}

export const CreatePost = ({ className, backEvent }: Props) => {
    return <div className={styles.container}>
        <BackButton backEvent={backEvent}/>
    </div>
}