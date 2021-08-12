import Image from 'next/image'

import styles from '../styles/components/post.module.scss'

import peopleImg from '../assets/image/people.jpeg'
import { Button } from './Button'
import { useState } from 'react'


export default function Post({createdAt,postContent, article}) {
    const [ comment, setComment ] = useState('')

    const datePublic = createdAt.split('T')[0].split('-').reverse().join('/')
    const hourCreate = createdAt.split('T')[1]

    return (
        <>
        <section className={styles.post}>
            <div className={styles.postContent}>
                <header className={styles.header__title}>
                    <h1 className={styles.title}>
                        {postContent.filter( item => item._modelApiKey === 'title').map(item => item.titulo)}
                        .
                    </h1>
                    <h3 className={styles.subtitle}>
                        {postContent.filter( item => item._modelApiKey === 'subtitle').map(item => item.subtitulo)}
                    </h3>
                    <h5 className={styles.autor}>Por {postContent.filter( item => item._modelApiKey === 'author').map(item => item.nome)}</h5>
                    <div className={styles.header__bottom}>
                        {
                            createdAt &&  <p className={styles.date}>{datePublic} {hourCreate}</p>
                        }
                        <div>
                            <span>Facebook</span>
                        </div>
                    </div>
                </header>
                
                <div className={styles.main__content}>
                    {
                        postContent.map( item => {
                            if (item._modelApiKey === 'content') {
                                return <div key={item.id} className={styles.content} dangerouslySetInnerHTML={{__html: item.conteudo}}></div>
                            }

                            if (item._modelApiKey === 'image') {
                                if(item.video) {
                                    return (
                                        <iframe
                                            key={item.id}
                                            // width="700"
                                            height="300" 
                                            src={`https://www.youtube.com/embed/${item.video?.providerUid}`}
                                            title="YouTube video player" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen>
                                        </iframe>
                                    )
                                }
                            }

                            if (item._modelApiKey === 'image') {
                                if(item.imagem[0]) {
                                    return (
                                        <Image
                                            key={item.id}
                                            className={styles.img}
                                            src={item.imagem[0].url}
                                            width={item.imagem[0].width}
                                            height={item.imagem[0].height}
                                        />
                                    )
                                }
                            }
                        })
                    }
                </div>
            </div>
            <div className={styles.interaction_post}>
                {/* {
                    postContent.filter( item => item._modelApiKey === "article").map(item => {
                        return (
                        <article key={item.id} className={styles.article__author_box }>
                            <header>
                                <h1>Opinião do escritor</h1>
                            </header>
                            {
                                <div className={styles.articleContent} dangerouslySetInnerHTML={{__html: item.articleContent}}></div>
                            }
                            <footer className={styles.footer}>
                                <Image 
                                    src={item.perfilImage.url}
                                    alt="imagem de perfil do escritor"
                                    width={80}
                                    height={80}
                                />
                                <div className={styles.article__author_info}>
                                    <span className={styles.author_name}>{item.name}</span>
                                    <span className={styles.article_createdAt}>Hoje</span>
                                </div>
                            </footer>
                        </article>)
                    })
                } */}
                <div className={styles.comments_box}>
                    <header>
                        <h1>Cometários</h1>
                    </header>
                    <div  className={styles.footer}>
                        <ul className={styles.comment_container}>
                            <li className={styles.article__author_info}>
                                <span className={styles.author_name}>Anna</span>
                                <span className={styles.article_createdAt}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                </span>
                            </li>

                            <li className={styles.article__author_info}>
                                <span className={styles.author_name}>Anna</span>
                                <span className={styles.article_createdAt}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                </span>
                            </li>
                        </ul>
                        <textarea
                        onChange={({target}) => {
                            if (comment.length < 100) {
                                setComment(target.value)
                            }
                        }}

                        onKeyUp={({code}) => {
                            if ( code === "Backspace" && comment.length === 100 ) {
                                setComment(comment.slice(0 , -1))
                            }
                        }}
                        value={comment}
                        placeholder="Deixe seu comentário!"
                         />
                         <p>100/{comment.length}</p>
                         <Button style={{color: 'white', backgroundColor: '#1669E6'}}>Enviar</Button>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

