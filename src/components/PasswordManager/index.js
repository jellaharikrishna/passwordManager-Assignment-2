import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import YourPasswords from '../YourPasswords'
import './index.css'

const initialBgColorList = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    userDataList: [],
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    userSearchInput: '',
    isCheckboxToggled: false,
  }

  onChangeWebsite = event => {
    this.setState({inputWebsite: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({inputUsername: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({userSearchInput: event.target.value})
  }

  onSubmitNewUserData = event => {
    event.preventDefault()
    const {inputWebsite, inputUsername, inputPassword} = this.state

    const initialClassname =
      initialBgColorList[
        Math.ceil(Math.random() * initialBgColorList.length - 1)
      ]

    const newUserDataForm = {
      id: uuidv4(),
      website: inputWebsite,
      username: inputUsername,
      password: inputPassword,
      bgColor: initialClassname,
    }

    this.setState(prevState => ({
      userDataList: [...prevState.userDataList, newUserDataForm],
      inputWebsite: '',
      inputUsername: '',
      inputPassword: '',
    }))
  }

  onToggleDelete = id => {
    this.setState(prevState => ({
      userDataList: prevState.userDataList.filter(
        eachData => eachData.id !== id,
      ),
    }))
  }

  onClickedCheckbox = () => {
    const {isCheckboxToggled} = this.state
    this.setState({isCheckboxToggled: !isCheckboxToggled})
  }

  getFilteredUserDataList = () => {
    const {userDataList, userSearchInput} = this.state

    const filterData = userDataList.filter(eachData =>
      eachData.website.toLowerCase().includes(userSearchInput.toLowerCase()),
    )

    return filterData
  }

  render() {
    const {
      inputWebsite,
      inputUsername,
      inputPassword,
      isCheckboxToggled,
    } = this.state
    const filteredUserDataList = this.getFilteredUserDataList()

    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="userpage-container">
          <img
            className="password-manager-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />

          <form
            className="new-password-container"
            onSubmit={this.onSubmitNewUserData}
          >
            <h1 className="addnewpassword-heading"> Add New Password</h1>
            <div className="input-card">
              <img
                className="users-icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                className="userinput"
                type="text"
                value={inputWebsite}
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-card">
              <img
                className="users-icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                className="userinput"
                type="text"
                value={inputUsername}
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-card">
              <img
                className="users-icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                className="userinput"
                type="password"
                value={inputPassword}
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="addbtn">
              Add
            </button>
          </form>
        </div>
        <div className="useroutput-conatiner">
          <div className="password-search-container">
            <div className="yourpasswords-card">
              <h1 className="yourpasswords-heading">Your Passwords</h1>
              <p className="password-count"> {filteredUserDataList.length}</p>
            </div>
            <div className="search-input-card">
              <img
                className="search-icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="serachinput"
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="showpasswords-card">
            <input
              className="checkbox"
              type="checkbox"
              id="checkboxId"
              onClick={this.onClickedCheckbox}
            />
            <label htmlFor="checkboxId" className="showpasswords-heading">
              Show Passwords
            </label>
          </div>
          {filteredUserDataList.length > 0 ? (
            <ul className="passwordlist-container">
              {filteredUserDataList.map(eachData => (
                <YourPasswords
                  key={eachData.id}
                  userData={eachData}
                  isCheckboxToggled={isCheckboxToggled}
                  onToggleDelete={this.onToggleDelete}
                />
              ))}
            </ul>
          ) : (
            <div className="nopassword-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
                className="no-password-image"
              />
              <p className="no-password-heading">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
