import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Button } from './Button'

import useAuth from '../hooks/useAuth'
import formatCreatedAt from './utils/formatCreatedAt'

import peopleImg from '../assets/image/people.jpeg'
import { BiUserCircle } from 'react-icons/bi'

import styles from '../styles/components/post.module.scss'
import { db } from '../lib/firebase'


export default function Post({idPost, createdAt,postContent}) {
    const [ comment, setComment ] = useState('')
    const [ comments, setComments ] = useState([])


    const datePublic = createdAt.split('T')[0].split('-').reverse().join('/')
    const hourCreate = createdAt.split('T')[1]

    const {user} = useAuth()

    useEffect(() => {
        const ref = db.ref(`comments/${idPost}`)

        ref.on('value', (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const arrData = Object.entries(data).map(([key, comment]) => {
                    return {
                        idComment: key,
                        comment
                    }
                })
                // console.log(arrData)
                setComments(arrData)
            }
        })
    }, [])

    
    // useEffect(() => {
        

 
    async function handleNewComment(e, id) {
        e.preventDefault()
        if (comment) {
            if ( id ) {
                const parsedCommet = {
                    content: comment,
                    author: user,
                    idPost: idPost
                }
            } else {
                const dataCreatedcomment = new Date()
                console.log(dataCreatedcomment)
                const parsedCommet = {
                    content: comment,
                    author: user,
                    createdAt: Date.parse(dataCreatedcomment)
                }
                
                await db.ref(`comments/${idPost}`).push(parsedCommet)
            }
        }
    }


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
                                            alt={item.alt}
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
                        <ul className={styles.comments}>
                            {/* <li data-key="1223" className={styles.article__author_info}>
                                <span className={styles.author_name}> <BiUserCircle size={'20px'} />Anna</span>
                                <span className={styles.article_createdAt}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                </span>
                                <form onSubmit={ (e) => {handleNewComment(e, 1223)}}>
                                <input onChange={({target}) => {
                                if (comment.length < 100) {
                                    setComment(target.value)
                                }
                            }} className="input" type="text" />
                                <Button>enviar</Button>
                                </form>
                            </li>

                            <li data-key="1223" className={styles.article__author_info}>
                                <span className={styles.author_name}>Anna</span>
                                <span className={styles.article_createdAt}>ipsum ullam beatae molestias. Dolor iusto optio veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                </span>
                            </li> */}
                            {
                                comments ? (
                                    comments.map( ({idComment, comment}) => (
                                    <li className={styles.comment} key={idComment}>
                                        <span className={styles.author_name}><BiUserCircle size={'20px'}/>{comment.author.name}</span>
                                        <span className={styles.content}>{comment.content}</span>
                                        <span className={styles.createdAt}>{formatCreatedAt(comment.createdAt)}</span>
                                    </li>
                                    ))
                                ) : <li>Não há comentárias. Seja o primeiro a comentar!</li>
                                
                            }
                        </ul>
                        <form onSubmit={handleNewComment}>
                            <textarea
                            onChange={({target}) => {
                                if (comment.length < 200) {
                                    setComment(target.value)
                                }
                            }}

                            onInput={(e) => {
                                if ( e.nativeEvent.inputType === "deleteContentBackward" && comment.length >= 200 ) {
                                    setComment(comment.slice(0 , -1))
                                }
                            }}
                            value={comment}
                            placeholder="Deixe seu comentário!"
                            />
                            <p>200/{comment.length}</p>
                            <Button disabled={comment.length && user?.name ? false : true} type="submit" isInverse>Enviar</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

