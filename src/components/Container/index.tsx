import styles from './styles.module.css'
import './../../styles/theme.css'

type ContainerProps = {
    children: React.ReactNode,
}

export function Container({children}: ContainerProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}