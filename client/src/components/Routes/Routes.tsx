import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CreateCollab } from '../CreateCollab'
import { Collab } from '../Collab'

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={() => <h1>home</h1>} />
    <Route path="/create" component={CreateCollab} />
    <Route path="/collab/:collabId">
      <Collab />
    </Route>
    <Route>
      <Redirect to="/" />
    </Route>
  </Switch>
)
