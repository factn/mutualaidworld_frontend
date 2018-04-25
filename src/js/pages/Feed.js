/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Header
import Header from "../components/Header"

// Main
import Main from "../components/Main"
import ScenarioFeed from "../components/ScenarioFeed"
import Scenario from "../components/Scenario"
import Loader from "../components/Loader"

// Footer
import Footer from "../components/Footer"

// Local JS Utilities
import Database from "../resources/Database"
import { getUrlPiece } from "../resources/Util"
/*** [end of imports] ***/

export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scenarioData: null,
      feedOffset: 0,
      userId: this.props.userId || 1,
      previewDismissed: false,
      lastUrlSegment: getUrlPiece()
    }
  }

  componentDidMount = () => {
    Database.scenarioFeed()
      .then(result => {
        console.info("Database call complete:", result.body)
        this.setState({
          feedOffset: result.body.data.length,
          scenarioData: result.body.data
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          feedOffset: 0,
          scenarioData: null
        })
      })
  }

  nextItem = () => {
    Database.nextInFeed({ offset: this.state.feedOffset })
      .then(result => {
        // console.info("Next in feed call complete:", result.body.data)
        this.setState({
          feedOffset: this.state.feedOffset + 1,
          scenarioData: this.state.scenarioData.concat(result.body.data)
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          feedOffset: 0,
          scenarioData: null
        })
      })
  }
  dismissPreview = () => {
    this.setState({
      previewDismissed: true
    })
  }

  render() {
    const {
      scenarioData,
      feedOffset,
      previewDismissed,
      lastUrlSegment
    } = this.state

    return (
      <div className={`page feed-page ${lastUrlSegment}-feed`}>
        <Header />
        
        <Main>
          <ScenarioFeed feedType={lastUrlSegment}>
            {scenarioData ? (
              scenarioData.map((scenario, index) => {
                if (index === feedOffset - 2) {
                  return (
                    <Scenario
                      key={scenario.id}
                      scenario={scenario}
                      first
                      nextItem={this.nextItem}
                      previewDismissed={previewDismissed}
                      dismissPreview={this.dismissPreview}
                      feedType={lastUrlSegment}
                    />
                  )
                } else if (index > feedOffset - 2) {
                  return (
                    <Scenario
                      key={scenario.id}
                      scenario={scenario}
                      feedType={lastUrlSegment}
                    />
                  )
                }
              })
            ) : (
              <Loader />
            )}
          </ScenarioFeed>
        </Main>

        <Footer>
          <div className="footer-left">
            <div className="dollar-amount">$200</div>
            <h4 className="dollar-amount-label">To spend</h4>
          </div>
          <div className="footer-right">
            <div className="dollar-amount">$0</div>
            <h4 className="dollar-amount-label">Donated</h4>
          </div>
        </Footer>
      </div>
    )
  }
}