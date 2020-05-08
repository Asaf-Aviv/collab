import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CreateCollab } from '../../create-collab'
import { Collab } from '../../collab'
import { Login, SignUp } from '../../auth-pages'
import { CollabPosts } from '../../../components/CollabPosts'
import { MyProfile } from '../../current-user-profile/MyProfile'
import { CollabPost } from '../../collab-post/CollabPost'
import { CollabPostsByStack } from '../../../components/CollabPostsByStack'
import { Home } from '../../home/Home/Home'
import { UserProfile } from '../../../components/UserProfile'
import { ProtectedRoute } from '../ProtectedRoute'
import { PublicOnlyRoute } from '../PublicOnlyRoute'

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <ProtectedRoute path="/profile">
      <MyProfile />
    </ProtectedRoute>
    <Route path="/create" component={CreateCollab} />
    <Route exact path="/collabs/posts" component={CollabPosts} />
    <Route exact path="/collabs/posts/:postId" component={CollabPost} />
    <Route path="/collabs/posts/stack/:stack" component={CollabPostsByStack} />
    <Route path="/collab/:collabId" component={Collab} />
    <Route path="/user/:userId" component={UserProfile} />
    <PublicOnlyRoute path="/login">
      <Login />
    </PublicOnlyRoute>
    <PublicOnlyRoute path="/signup">
      <SignUp />
    </PublicOnlyRoute>
    <Redirect to="/" />
  </Switch>
)
