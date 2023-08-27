class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        const userInputsData = {
            name: this._name.textContent,
            job: this._job.textContent,
        }
        return userInputsData;
    }

    setUserInfo(userInputsData) {
        this._name.textContent = userInputsData.name;
        this._job.textContent = userInputsData.job;
    }
}

export default UserInfo;