import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  console.log(repoDetails)

  const {name, avatarUrl, starsCount, forksCount, issuesCount} = repoDetails
  return (
    <div className="repo-bg">
      <img alt={name} src={avatarUrl} className="repo-img" />
      <h1 className="repo-name">{name}</h1>
      <div>
        <div className="spec-info">
          <img
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="icon"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="spec-info">
          <img
            alt="forks"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="icon"
          />
          <p className="info">{forksCount} forks</p>
        </div>
        <div className="spec-info">
          <img
            alt="open issues"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="icon"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </div>
  )
}
export default RepositoryItem
