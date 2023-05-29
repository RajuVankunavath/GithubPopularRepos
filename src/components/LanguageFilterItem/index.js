// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, getLanguageData, isActive} = props
  const {language, id} = details
  console.log(isActive)

  const buttonClassName = isActive ? 'activeButton' : null

  const getLanguages = () => {
    getLanguageData(id)
  }

  return (
    <li className="list-items">
      <button
        className={`button ${buttonClassName}`}
        type="button"
        onClick={getLanguages}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
