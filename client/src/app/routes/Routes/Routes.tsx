import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CreateCollab } from '../../../components/CreateCollab'
import { Collab } from '../../../components/Collab'
import { Login } from '../../../components/Login/Login'
import { SignUp } from '../../../components/SignUp/SignUp'
import { CollabPosts } from '../../../components/CollabPosts/CollabPosts'
import { MyProfile } from '../../../components/MyProfile/MyProfile'
import { CollabPost } from '../../../components/CollabPost/CollabPost'
import { CollabPostsByStack } from '../../../components/CollabPostsByStack/CollabPostsByStack'
import { Home } from '../../../components/Home/Home'
import { UserProfile } from '../../../components/UserProfile/UserProfile'
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
