import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onChangeLanguage, activeLanguageId} = props
  const {language, id} = languageDetails

  let clickedCSS = ''
  if (activeLanguageId === id) {
    clickedCSS = 'clicked'
  }

  const onClickLanguage = () => {
    onChangeLanguage(id)
  }

  return (
    <button
      onClick={onClickLanguage}
      type="button"
      className={`language-btn ${clickedCSS}`}
    >
      {language}
    </button>
  )
}

export default LanguageFilterItem
