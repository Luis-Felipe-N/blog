import { useEffect } from 'react'
import Head from 'next/head'

import { getAllPost, getPost } from '../lib/datocms'

import Header from '../components/Header'
import Card from '../components/Card'
import Post from '../components/Post'

import styles from '../styles/Home.module.scss'


export default function Home({headline, posts}) {

    return (
        <>
            <Head>
                <title>
                    Blog - Tech
                </title>
            </Head>
            <Header />
            <main className={styles.main}>
                {
                    headline && <Post idPost={headline.id} createdAt={headline.createdAt} postContent={headline.postcontent} />
                }
                <section className={styles.more_content}>
                    <h2>Continue lendo:</h2>
                    <div className={styles.container_card} >
                    {
                        posts && (
                            posts.map( ({id, postcontent}) => {
                                const author = postcontent.filter( item => item._modelApiKey === 'author')[0]
                                const title = postcontent.filter( item => item._modelApiKey === 'title').map(item => item.titulo)
                                const thumb = postcontent.filter( item => item._modelApiKey === 'thumb').map(item => item.thumb)[0]
                                return (
                                    <Card
                                        key={id}
                                        idPost={id}
                                        title={title}
                                        author={author}
                                        thumb={thumb}
                                    />
                                )
                            })
                        )
                    }
                    </div>
                </section>
            </main>
        </>
    )
}


export async function getStaticProps() {
    const response = await getAllPost()
    const posts = response.allPosts
    const headline = response.allPosts[0]

    if (!posts[0].postcontent) {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
              },
        }
    }
    return {
        props: {
            headline,
            posts
        },
        revalidate: 60
    }
}