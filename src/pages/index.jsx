import Head from 'next/head'

import { getAllPost } from '../lib/datocms'

import Header from '../components/Header'
import Post from '../components/Post'

import styles from '../styles/pages/Home.module.scss'
import { SuggestedPosts } from '../components/SuggestedPosts'


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
                    {
                        posts && (
                            <SuggestedPosts createdAt={headline.createdAt} posts={posts} category="css" />
                        )
                    }
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