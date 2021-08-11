

import styles from '../styles/pages/sing.module.scss'
import Header from './Header'

export default function singup({children}) {
    return (
        <>
            <main className={styles.sing}>
                <aside>

                </aside>
                <section className={styles.containerForm}>
                    <div>
                        {children}
                    </div>
                </section>
            </main>
        </>
    )
}