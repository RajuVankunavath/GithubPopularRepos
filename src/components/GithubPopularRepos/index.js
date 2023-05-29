import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguangeFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apisStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apisStatusConstant.initial,
    languangeData: [],
    activeLanguageRepo: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getApisData()
  }

  getApisData = async () => {
    const {activeLanguageRepo} = this.state
    this.setState({apiStatus: apisStatusConstant.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageRepo}`,
    )

    if (response.ok) {
      const data = await response.json()
      const updateData = data.popular_repos.map(item => ({
        id: item.id,
        name: item.name,
        avatarUrl: item.avatar_url,
        forksCount: item.forks_count,
        issuesCount: item.issues_count,
        starsCount: item.stars_count,
      }))
      console.log(updateData)
      this.setState({
        languangeData: updateData,
        apiStatus: apisStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apisStatusConstant.failure})
    }
  }

  getLanguageData = id => {
    this.setState({activeLanguageRepo: id}, this.getApisData)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderAuthFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderAuthLaguageFilterList = () => {
    const {languangeData} = this.state

    return (
      <ul className="languange-container-list">
        {languangeData.map(data => (
          <RepositoryItem key={data.id} details={data} />
        ))}
      </ul>
    )
  }

  renderAuthLanguageFilterData = () => {
    const {activeLanguageRepo} = this.state
    return (
      <ul className="container-list">
        {languageFiltersData.map(eachData => (
          <LanguangeFilterItem
            key={eachData.id}
            details={eachData}
            isActive={eachData.id === activeLanguageRepo}
            getLanguageData={this.getLanguageData}
          />
        ))}
      </ul>
    )
  }

  renderAuthRepository = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisStatusConstant.success:
        return this.renderAuthLaguageFilterList()
      case apisStatusConstant.failure:
        return this.renderAuthFailureView()
      case apisStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-container">
        <h1 className="heading">Popular</h1>
        {this.renderAuthLanguageFilterData()}
        {this.renderAuthRepository()}
      </div>
    )
  }
}

export default GithubPopularRepos
