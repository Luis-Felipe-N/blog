import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'

import { getAllPost, getPost } from '../../lib/datocms'

import Header from "../../components/Header";
import Post from '../../components/Post'
import { SuggestedPosts } from "../../components/SuggestedPosts";

export default function PostPost({posts, post}) {
 
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
    // const response = await getPost(context.params.id)
    const responseAllPost = await getAllPost()
    const posts = responseAllPost.allPosts
    const post = posts.filter(post => post.id === context.params.id)

    return {
        props: {
            post,
            posts
        },
        revalidate: 100
    }
}