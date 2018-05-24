/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"

// Components
import Page from "./Page"
import Main from "../components/Main"
import Footer from "../components/Footer"
import Form from "../components/Form"
import Submit from "../components/inputs/Submit"
import SessionSetting from "../components/SessionSetting"
import SessionCard from "../components/SessionCard"

// Local JS Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

export default class Login extends Component {
  state = {
    buttonPressed: false
  }

  submitLogin = params => {
    if (!this.state.buttonPressed) {
      const json = {
        email: params.email,
        password: params.password
      }

      this.setState({
        buttonPressed: true
      })

      Database.attemptLogin(json)
        .then(result => {
          // console.log("Login complete:", result)

          this.setUserCookie(result)
        })
        .catch(error => {
          // console.error("Error getting user:", error)
        })
    }
  }
  setUserCookie = userId => {
    Cookies.set("userId", userId)
    this.props.history.push("/")
  }

  render() {
    let buttonObj = {
      labelPhrase: "Sign In",
      clas: "footer-btn user-login-btn",
      onSubmit: this.submitLogin,
      onSubmitParams: {
        email: "username",
        password: "password"
      }
    }

    return (
      <Page clas="flow-page login-page">
        <Main>
          <Form>
            <SessionSetting clas="login-settings" headerLabel="Log In">
              <SessionCard clas="input-card email-card">
                <input type="text" placeholder="Enter your email" id="username" />
              </SessionCard>

              <SessionCard clas="input-card password-card">
                <input type="password" placeholder="Enter your password" id="password" />
              </SessionCard>
            </SessionSetting>

            <Footer>
              <Submit {...buttonObj} />
            </Footer>
          </Form>
        </Main>
      </Page>
    )
  }
}
