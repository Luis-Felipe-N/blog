import Image from 'next/image'

import Link from 'next/link'

import styles from '../styles/components/card.module.scss'


export default function Card({idPost, title, thumb, author}) {

    return (
        <Link href={`/post/${idPost}`}>
            <article className={styles.card}>
                <Image
                    src={thumb.url}
                    alt="Capa do card"
                    width={300}
                    height={150}
                />
                <div className={styles.card_footer}>
                    <h1 className={styles.title}>
                        {title}
                    </h1>
                    <div className={styles.info}>
                        <Image 
                            src={author.imagem.url}
                            width={80}
                            height={80}
                        />
                        <div>
                            <div className={styles.article__author_info}>
                                <span className={styles.author_name}>{author.nome}</span>
                                <span className={styles.article_createdAt}>Há 5 dias</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}