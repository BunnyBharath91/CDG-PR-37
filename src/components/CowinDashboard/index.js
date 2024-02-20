import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {reChartsData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const vaccinationCoverageData = data.last_7_days_vaccination.map(
        eachItem => ({
          vaccineDate: eachItem.vaccine_date,
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
        }),
      )
      const vaccinationByGenderData = data.vaccination_by_gender.map(
        eachItem => ({
          gender: eachItem.gender,
          count: eachItem.count,
        }),
      )
      const vaccinationByAgeData = data.vaccination_by_age
      this.setState({
        reChartsData: {
          vaccinationCoverageData,
          vaccinationByGenderData,
          vaccinationByAgeData,
        },
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-view" data-testid="loader">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderVaccinationStats = () => {
    const {reChartsData} = this.state
    const {
      vaccinationCoverageData,
      vaccinationByGenderData,
      vaccinationByAgeData,
    } = reChartsData
    console.log(vaccinationByAgeData)
    console.log(vaccinationByGenderData)

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageData={vaccinationCoverageData}
        />
        <VaccinationByGender
          vaccinationByGenderData={vaccinationByGenderData}
        />
        <VaccinationByAge vaccinationByAgeData={vaccinationByAgeData} />
      </>
    )
  }

  renderViewsBasedOnAPIStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStats()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="website-logo-container">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="website-logo"
          />
          <h1 className="website-name">Co-Win</h1>
        </div>
        <h1 className="main-heading">CoWIN Vaccination in India</h1>
        {this.renderViewsBasedOnAPIStatus()}
      </div>
    )
  }
}

export default CowinDashboard
