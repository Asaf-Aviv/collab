import { gql } from 'apollo-boost'

// Authentication
export const SIGNUP = gql`
  mutation SignUp($credentials: SignUpArgs!) {
    signUp(credentials: $credentials) {
      token
    }
  }
`

export const LOGIN = gql`
  mutation Login($credentials: LoginArgs!) {
    login(credentials: $credentials) {
      token
    }
  }
`

// Collab Post
export const CREATE_COLLAB_POST = gql`
  mutation CreateCollabPost($post: CollabPostArgs!) {
    createCollabPost(post: $post) {
      id
    }
  }
`

export const ADD_COLLAB_POST_COMMENT = gql`
  mutation AddCollabPostComment($content: String!, $postId: ID!) {
    createComment(content: $content, postId: $postId) {
      id
      content
      author {
        id
        username
        avatar
      }
    }
  }
`
