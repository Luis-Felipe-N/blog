import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import { getAllPost, getPost } from '../../lib/datocms'

import Header from "../../components/Header";
import Post from '../../components/Post'
import { SuggestedPosts } from "../../components/SuggestedPosts";
import { NextSeo } from 'next-seo'

export default function PostPost({post, posts}) {
    const [ postInfosFormated, setPostInfosFormated ] = useState()

    const router = useRouter()

    useEffect(() => {
        if ( post ) {
            const postInfos = {
                title: post.postcontent.filter( item => item._modelApiKey === 'title').map(item => item.titulo)[0],
                description: post.postcontent.filter( item => item._modelApiKey === "subtitle").map(item => item.subtitulo)[0],
                category: post.postcontent.filter( item => item._modelApiKey === 'category').map(item => item.categorias)[0],
                thumb: post.postcontent.filter( item => item._modelApiKey === 'thumb').map(item => item.thumb.url)[0],
                url: window.location.href
            }
    
            setPostInfosFormated(postInfos)
        }
    }, [post])
    
    return (
        <>
            {
                postInfosFormated && (
                    <NextSeo
                        title={postInfosFormated.title}
                        description={postInfosFormated.description}
                        canonical={postInfosFormated.url}
                        openGraph={{
                            url: postInfosFormated.url,
                            description: postInfosFormated.description,
                            locale: 'PT_BR',
                            canonical: postInfosFormated.url,
                            images: [
                            {
                                url: postInfosFormated.thumb,
                                width: 100,
                                height: 100,
                                alt: 'Imagem de perfil',
                                type: 'image/jpeg',
                            },
                            {
                                url: postInfosFormated.thumb,
                                width: 100,
                                height: 100,
                                alt: 'Imagem de perfil',
                                type: 'image/jpeg',
                            },
                            { url: postInfosFormated.thumb },
                            { url: postInfosFormated.thumb },
                            ],
                            site_name: 'Blog Tech',
                        }}
                        twitter={{
                            handle: '@handle',
                            site: '@site',
                            cardType: 'summary_large_image',
                        }}
                    />
                )
            }
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
                        <SuggestedPosts posts={posts} category={post.postcontent.filter( item => item._modelApiKey === 'category').map(item => item.categorias)[0]} />
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
    if ( context.params.id ) {
        const responseAllPost = await getAllPost()
        const posts = await responseAllPost.allPosts

        const [, idPost ] = context.params.id

        const [post] = posts.filter( post => post.id == idPost)

        return {
            props: {
                post,
                posts
            },
        }
    }
}
