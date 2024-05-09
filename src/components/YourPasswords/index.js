import './index.css'

const YourPasswords = props => {
  const {userData, onToggleDelete, isCheckboxToggled} = props
  const {id, website, username, password, bgColor} = userData

  const onDeleteBtn = () => {
    onToggleDelete(id)
  }

  return (
    <li className="password-card">
      <div className="first-name-data-card">
        <button type="button" className={`userfirstchar ${bgColor}`}>
          {username[0]}
        </button>
        <div className="password-data">
          <p className="password-heading">{website}</p>
          <p className="password-heading">{username}</p>
          {isCheckboxToggled ? (
            <p className="password-heading">{password}</p>
          ) : (
            <img
              className="password-stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
      </div>
      <button
        data-testid="delete"
        type="button"
        className="delete-btn"
        onClick={onDeleteBtn}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default YourPasswords
