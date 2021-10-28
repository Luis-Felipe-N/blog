import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import Head from 'next/head'

import { getAllPost, getPost } from '../../lib/datocms'

import Header from "../../components/Header";
import Post from '../../components/Post'
import { SuggestedPosts } from "../../components/SuggestedPosts";

export default function PostPost({posts}) {
    const [ post, setPost ] = useState()

    const router = useRouter()
 
    useEffect(() => {
        if ( posts) {
            const [,idPost] = router.query.id   
    
            if (router.query.id) {
                const [parsedPost] = posts.filter( post => post.id == idPost)
                console.log(parsedPost)
                if (parsedPost) {
                    setPost(parsedPost)
                } else {
                    router.push('/404')
                }
            }
        }
    }, [posts, router])
    
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

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}


export async function getStaticProps(context) {
    const responseAllPost = await getAllPost()
    const posts = await responseAllPost.allPosts
    return {
        props: {
            posts
        },
    }
}
