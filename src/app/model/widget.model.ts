export class Widget {
  _id: string;
  name: string;
  widgetType: string;
  pageId: string;
  size: string;
  text: string;
  url: string;
  width: string;
  isFormatted: boolean;
  constructor(id: string, name: string, widgetType: string, pageId: string, size: string, text: string, width: string, url: string,
              isFormatted: boolean) {
    this._id = id;
    this.name = name;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.url = url;
    this.width = width;
    this.isFormatted = isFormatted;
  }
}
