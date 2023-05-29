// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, avatarUrl, forksCount, starsCount, issuesCount} = details

  return (
    <li className="languange-list-items">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="language-name ">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="star-logo"
        />
        <p className="stars-count">{starsCount}</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="star-logo"
        />
        <p className="stars-count">{forksCount}</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png  "
          alt="open issues"
          className="star-logo"
        />
        <p className="stars-count">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
