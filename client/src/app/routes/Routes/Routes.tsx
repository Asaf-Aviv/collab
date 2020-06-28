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
import { SearchPage } from '../../search-page'

export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <ProtectedRoute path="/profile">
      <MyProfile />
    </ProtectedRoute>
    <Route path="/create">
      <CreateCollab />
    </Route>
    <Route exact path="/collabs/posts">
      <CollabPosts />
    </Route>
    <Route exact path="/collabs/posts/:postId">
      <CollabPost />
    </Route>
    <Route path="/collabs/posts/stack/:stack">
      <CollabPostsByStack />
    </Route>
    <Route path="/collab/:collabId">
      <Collab />
    </Route>
    <Route path="/search">
      <SearchPage />
    </Route>
    <Route path="/user/:userId">
      <UserProfile />
    </Route>
    <PublicOnlyRoute path="/login">
      <Login />
    </PublicOnlyRoute>
    <PublicOnlyRoute path="/signup">
      <SignUp />
    </PublicOnlyRoute>
    <Redirect to="/" />
  </Switch>
)
