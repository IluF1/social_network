import { useAppSelector } from "@/shared/Helpers/Hooks/useAppSelector"
import styles from './MiniProfile.module.css'
import { useNavigate } from "react-router-dom"

export const MiniProfile = () => {
    const user = useAppSelector(state => state.user.user)
    return <a className={styles.container} href={`/${user.login}`}>
        <img src={user.avatar} alt="avatar" className={styles.avatar} loading="lazy"/>
        <h1 className={styles.name}>{user.name}</h1>
    </a>
}