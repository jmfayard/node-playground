export type User = {
    age: number;
    name: string;
    sex: UserSex;
}

export enum UserSex {
    OTHER,
}

class UserClass {
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    isAdult() {
        return this.user.age >= 18;
    }

}

export default UserClass;



