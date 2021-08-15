import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'

import { getAllPost, getPost } from '../../lib/datocms'

import Header from "../../components/Header";
import Post from '../../components/Post'
import { SuggestedPosts } from "../../components/SuggestedPosts";

export default function PostPost() {
    const [ post, setPost ] = useState()
    const [ posts, setPosts ] = useState()
    const router = useRouter()
    const idPost = router.query.id
 
    useEffect(() => {
        const getPostPage = async () => {
            const response = await getPost(idPost)
            const responseAllPost = await getAllPost()
            setPosts(responseAllPost?.allPosts)
            const headline = response?.allPosts[0]
            setPost(headline)
        }

        getPostPage()
    }, [idPost])

    return (
        <>
            <Header />
            {
                post && (
                    <>
                        <Head>
                            <title>
                            {
                                post.postcontent.filter( item => item._modelApiKey === 'title').map(item => item.titulo)
                            }
                            </title>
                        </Head>
                        <Post idPost={post.id} createdAt={post.createdAt} postContent={post.postcontent} />
                        <SuggestedPosts posts={posts} category="css" />
                    </>
                )
            }
            
        </>
    )
}

// export async function getStaticProps(context) {
//     const response = await getPost(context.params)
//     const post = response.allPosts[0]

//     return {
//         props: {
//             post
//         },
//         // revalidate: 100
//     }
// }