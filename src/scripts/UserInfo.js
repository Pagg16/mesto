export class UserInfo {
  constructor({ nameUsers, informUsers, avatarUser }) {
    this._nameUsers =  document.querySelector(nameUsers);
    this._informUsers = document.querySelector(informUsers);
    this._avatarUser = document.querySelector(avatarUser);
  }
  getUserInfo() {
    const dataUser = {};

    dataUser.name = this._nameUsers.textContent;
    dataUser.job = this._informUsers.textContent;

    return dataUser;
  }
  
  setUserAvatar({avatarUser}) {
    this._avatarUser.src = avatarUser;
  }

  setUserInfo({ name, job}) {
    this._nameUsers.textContent = name;
    this._informUsers.textContent = job;
  }
}
