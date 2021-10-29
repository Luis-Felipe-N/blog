const endPointer = "https://graphql.datocms.com/"


const fetchCMSApi = async (query, { variables } = {}) => {
    const response = await fetch(endPointer, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: process.env.NEXT_PUBLIC_DATO_TOKEN
        },
        body:  JSON.stringify({query, variables})
    })
    
    const json = await response.json()

    if (json.erros) {
        return new Error('Failed to fecth API')
    }
    
    return json.data
}


export const getAllPost = async () => {
    const data = await fetchCMSApi(`
    {
      allPosts(orderBy: _createdAt_DESC) {
        id
        _status
        createdAt
        postcontent {
          ... on CodeRecord {
            id
            language
            _modelApiKey
            content
          }
          ... on CategoryRecord {
            id
            categorias
            _modelApiKey
          }
          ... on ContentRecord {
            conteudo
            id
            _modelApiKey
          }
          ... on ImageRecord {
            id
            imagem {
              url
              title
              alt
              height
              width
            }
            video {
              providerUid
              title
            }
            _modelApiKey
          }
          ... on SubtitleRecord {
            subtitulo
            _modelApiKey
          }
          ... on TitleRecord {
            titulo
            _modelApiKey
          }
          ... on AuthorRecord {
            nome
            _modelApiKey
            imagem {
              alt
              title
              url
            }
          }
          ... on ArticleRecord {
            id
            _modelApiKey
            name
            articleContent
            perfilImage {
              url
            }
          }
          ... on ThumbRecord {
            id
            _modelApiKey
            thumb {
              url
              title
              alt
            }
          }
        }
      }
    }
      
    `)

    return data
}

export const getPost = async postId => {
    const data = await fetchCMSApi(`
    {
      allPosts(filter: {id: {eq: "${postId}"}}) {
        id
        _status
        createdAt
        postcontent {
          ... on CodeRecord {
            id
            language
            _modelApiKey
            content
          }
          ... on ContentRecord {
            conteudo
            id
            _modelApiKey
          }
          ... on ImageRecord {
            id
            imagem {
              url
              title
              alt
              height
              width
            }
            video {
              providerUid
              title
            }
            _modelApiKey
          }
          ... on SubtitleRecord {
            subtitulo
            _modelApiKey
          }
          ... on TitleRecord {
            titulo
            _modelApiKey
          }
          ... on AuthorRecord {
            nome
            _modelApiKey
            imagem {
              alt
              title
              url
            }
          }
          ... on ArticleRecord {
            id
            _modelApiKey
            name
            articleContent
            perfilImage {
              url
            }
          }
          ... on ThumbRecord {
            id
            _modelApiKey
            thumb {
              url
              title
              alt
            }
          }
        }
      }
    }
  
    `)
    return data
}