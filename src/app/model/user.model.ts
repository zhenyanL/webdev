export class User {
  _id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string
  constructor(id: string, userName: string, password: string, firstName: string, lastName: string, email: string) {
    this._id = id;
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }


}
