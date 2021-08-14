import Header from "../../components/Header";
import { getAllPost } from "../../lib/datocms";

export default function Category() {
    async function getPosts() {
        const category = 'html'
    const response = await getAllPost()
    const posts = response.allPosts
    const postsByCategory = posts.filter( ({postcontent})  => postcontent.find((item) => item.categorias === 'html'))
    console.log(postsByCategory)
    }

    getPosts()
    return (
        <>
        <Header />
        <main>

        </main>
        </>
    )
}

// export const getStaticPaths = () => {
//     return {
//         paths: [],
//         fallback: true
//     }
// }

// export const getStaticProps = async (context) => {
//     const catregory = context.category
//     const response = await getAllPost()
//     const posts = response.allPosts
//     const postsByCategory = posts.filter( ({postcontent})  => postcontent.category === category)

//     return {
//         props: {
//             postsByCategory
//         }
//     }
// }

//  ... on CategoryRecord {
//         id
//         categorias
//         _modelApiKey
//       }