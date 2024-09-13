import { CustomInput } from "@/shared"
import styles from './Home.module.css'

export const Home = () => {
    return <main className={styles.container}>
        <div className={styles.content}>
            <CustomInput children="Что у вас сегодня нового?" className=" w-full"/>
        </div>
    </main>
}
