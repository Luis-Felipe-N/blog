import Image from 'next/image'
import Router from 'next/router'

import styles from '../styles/components/card.module.scss'
import formatCreatedAt from '../utils/formatCreatedAt'


export default function Card({createdAt, idPost, title, thumb, author}) {

    function handleRedirectPagePost() {
        const titleFormated = title[0].replaceAll(' ', '-')
        // console.log(title)
        Router.push(`/post/${titleFormated}/${idPost}`)
    }

    return (
        <article onClick={handleRedirectPagePost} className={styles.card}>
            <Image
                src={thumb.url}
                title={thumb.title}
                alt={thumb.alt}
                width={300}
                height={150}
            />
            <div className={styles.card_footer}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <div className={styles.info}>
                    <Image
                        alt="Imagem do autor"
                        src={author.imagem.url}
                        width={80}
                        height={80}
                    />
                    <div>
                        <div className={styles.article__author_info}>
                            <span className={styles.author_name}>{author.nome}</span>
                            <span className={styles.article_createdAt}>{formatCreatedAt(Date.parse(createdAt))}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}