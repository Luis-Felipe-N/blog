import Image from 'next/image'
import Link from 'next/link'

import image404 from '../assets/image/pagenotfound.svg'
import styles from '../styles/pages/404.module.scss'

export default function NotFound() {
    return (
        <div className={styles.main}>
            <Image
                src={image404}
                alt="Imagem de erro 404"
                width={900}
                height={350}
            />
            <h3>Está perdido? <Link href='/'>Volte para onde tudo começou!</Link></h3>
        </div>
    )
}