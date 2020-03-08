import React from 'react'
import { gql } from 'apollo-boost'
import { useCollabPostsQuery } from '../../graphql/generates'
import { Link } from 'react-router-dom'

export const GET_COLLAB_POSTS = gql`
  query CollabPosts {
    collabPosts {
      id
      title
    }
  }
`

export const CollabPosts = () => {
  const { data, loading, error } = useCollabPostsQuery()

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch Collabs</h1>
  if (!data) return null

  const { collabPosts } = data

  return (
    <div>
      {collabPosts.map(post => (
        <Link key={post.id} to={`/collabs/posts/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>
      ))}
    </div>
  )
}
