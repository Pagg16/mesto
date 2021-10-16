export class UserInfo {
  constructor({ nameUsers, informUsers }) {
    this._nameUsers =  document.querySelector(nameUsers);
    this._informUsers = document.querySelector(informUsers);
  }
  getUserInfo() {
    const dataUser = {};

    dataUser.name = this._nameUsers.textContent;
    dataUser.job = this._informUsers.textContent;

    return dataUser;
  }

  setUserInfo({ name, job }) {
    this._nameUsers.textContent = name;
    this._informUsers.textContent = job;
  }
}
