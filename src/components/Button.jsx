import styles from '../styles/components/button.module.scss'

export function Button({children, ...props}) {
   
    return (
        <button className={styles.button} {...props} >{children}</button>    )
}

