
export class Website {
  _id: string;
  name: string;
  userId: string;
  description: string;
  constructor(id: string, name: string, developerId: string, description: string) {
    this._id = id;
    this.name = name;
    this.userId = developerId;
    this.description = description;
  }
}
