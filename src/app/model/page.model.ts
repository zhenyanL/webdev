export class Page{
  _id: string;
  name: string;
  websiteId: string;
  title: string;
  constructor(id: string, name: string, websiteId: string, title: string){
    this._id = id;
    this.name = name;
    this.websiteId = websiteId;
    this.title = title;
  }
}
