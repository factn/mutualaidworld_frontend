/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"

// Styles
import "./App.scss"

// Pages
import Home from "./js/pages/Home"
import DonatorFlowSettings from "./js/pages/DonatorFlowSettings"
import Feed from "./js/pages/Feed"

// 	Home Tabs
// import RequesterTab from "./js/pages/RequesterTab"
// import DoerTab from "./js/pages/DoerTab"
// import VerifierTab from "./js/pages/VerifierTab"

// 	Modals
import Account from "./js/pages/Account"
import EditAccount from "./js/pages/EditAccount"
import Login from "./js/pages/Login"
import Preferences from "./js/pages/Preferences"
import Profile from "./js/pages/Profile"

// 	Flow Pages
import DonatorFlow from "./js/pages/DonatorFlow"
import RequesterFlow from "./js/pages/RequesterFlow"
import DoerFlow from "./js/pages/DoerFlow"
import VerifierFlow from "./js/pages/VerifierFlow"
import Thanks from "./js/pages/Thanks"
import Info from "./js/pages/Info"

// 404
import NoPage from "./js/pages/NoPage"
/*** [end of imports] ***/

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/donator" component={DonatorFlowSettings} />
          <Route path="/feed" component={Feed} />


          {/* Modals */}
          <Route path="/account" component={Account} />
          <Route path="/edit-account" component={EditAccount} />
          <Route path="/login" component={Login} />
          <Route path="/preferences" component={Preferences} />
          <Route path="/profile" component={Profile} />

          {/* Flows */}
          <Route path="/:scenarioId/donator" component={DonatorFlow} />
          <Route path="/:scenarioId/requester" component={RequesterFlow} />
          <Route path="/:scenarioId/doer" component={DoerFlow} />
          <Route path="/:scenarioId/verifier" component={VerifierFlow} />
          <Route path="/:scenarioId/info" component={Info} />
          <Route path="/:scenarioId/thanks" component={Thanks} />

          {/* 404 */}
          <Route component={NoPage} />
        </Switch>
      </div>
    )
  }
}
