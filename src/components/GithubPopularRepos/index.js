import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const displayOptions = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    reposList: [],
    isLoading: displayOptions.loading,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeLanguageId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(githubReposApiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(repo => ({
        name: repo.name,
        avatarUrl: repo.avatar_url,
        forksCount: repo.forks_count,
        id: repo.id,
        issuesCount: repo.issues_count,
        starsCount: repo.stars_count,
      }))

      this.setState({
        reposList: formattedData,
        isLoading: displayOptions.success,
      })
    } else {
      this.setState({isLoading: displayOptions.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepos = () => {
    const {reposList} = this.state

    return (
      <ul className="repo-ul-container">
        {reposList.map(repo => (
          <li key={repo.id}>
            <RepositoryItem repoDetails={repo} />
          </li>
        ))}
      </ul>
    )
  }

  onChangeLanguage = activeLanguage => {
    this.setState(
      {activeLanguageId: activeLanguage, isLoading: displayOptions.loading},
      this.getRepos,
    )
  }

  renderError = () => (
    <div className="error-bg">
      <img
        alt="failure view"
        className="error-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="wrong-msg">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {isLoading, activeLanguageId} = this.state

    let content
    switch (isLoading) {
      case displayOptions.success:
        content = this.renderRepos()
        break
      case displayOptions.loading:
        content = this.renderLoader()
        break
      case displayOptions.failure:
        content = this.renderError()
        break
      default:
        content = null
    }

    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="language-tab-container">
          {languageFiltersData.map(language => (
            <li key={language.id}>
              <LanguageFilterItem
                onChangeLanguage={this.onChangeLanguage}
                activeLanguageId={activeLanguageId}
                languageDetails={language}
              />
            </li>
          ))}
        </ul>
        {content}
      </div>
    )
  }
}

export default GithubPopularRepos
