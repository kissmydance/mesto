class UserInfo {
    constructor({name, job, avatar, userId}) {
        this._name = name;
        this._job = job;
        this._avatar = avatar;
        this._userId = userId;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._job.textContent,
            avatar: this._avatar.src,
            userId: this._userId
        }
    }

    setUserInfo(name, about, avatar, userId) {
        this._name.textContent = name;
        this._job.textContent = about;
        this.this._avatar.src = avatar;
        this._userId = userId;
    }
}

export default UserInfo;