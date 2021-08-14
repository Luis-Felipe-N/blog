import { useRouter } from 'next/router'
import Image from 'next/image'

import Header from "../../components/Header";
import Card from "../../components/Card"

import { getAllPost } from "../../lib/datocms";

import styles from '../../styles/pages/categories.module.scss'

export default function Category({postsByCategory}) {

    const router = useRouter()

    console.log()

    return (
        <>
        <Header />
        <main className={styles.main}>
            {
                postsByCategory && postsByCategory.length ? (
                    <div>
                        <h1>Principais posts sobre {router.query.category}</h1>
                        {
                            postsByCategory.map( ({id, postcontent}) => {
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
                        }
                    </div>
                )
                : (
                    <>
                        <Image  
                            src="/notcomments.svg"
                            alt="Ainda não há comentátarios"
                            width={900}
                            height={350}
                        />
                        {router.query.category && <h3 className={styles.not_commnets}>Ainda não há post sobre {router.query?.category.toUpperCase()}</h3>}
                    </>
                )
            }
        </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const category = context.params.category
    console.log(category)
    const response = await getAllPost()
    const posts = response.allPosts
    const postsByCategory = posts.filter( ({postcontent})  => postcontent.find((item) => item.categorias === category))

    return {
        props: {
            postsByCategory
        },
        revalidate: 1
    }
}

//  ... on CategoryRecord {
//         id
//         categorias
//         _modelApiKey
//       }