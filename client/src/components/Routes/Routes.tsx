import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CreateCollab } from '../CreateCollab'
import { Collab } from '../Collab'
import { Login } from '../Login/Login'
import { SignUp } from '../SignUp/SignUp'
import { CollabPosts } from '../CollabPosts/CollabPosts'
import { MyCollabs } from '../MyCollabs/MyCollabs'
import { CollabPost } from '../CollabPost/CollabPost'
import { CollabPostsByStack } from '../CollabPostsByStack/CollabPostsByStack'
import { Home } from '../Home/Home'
import { UserProfile } from '../UserProfile/UserProfile'
// import { useGetCurrentUserQuery } from '../../graphql/generates'

export const Routes = () => {
  // const { data } = useGetCurrentUserQuery()
  // const currentUser = data?.currentUser

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create" component={CreateCollab} />
      <Route exact path="/collabs/posts" component={CollabPosts} />
      <Route exact path="/collabs/posts/:postId" component={CollabPost} />
      <Route
        path="/collabs/posts/stack/:stack"
        component={CollabPostsByStack}
      />
      <Route path="/collab/:collabId" component={Collab} />
      <Route path="/user/:userId" component={UserProfile} />
      <Route path="/profile/my-collabs" component={MyCollabs} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Redirect to="/" />
    </Switch>
  )
}
