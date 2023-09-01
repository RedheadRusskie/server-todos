export class ToDo {
  id: string;
  name: string;
  body: string;
  complete: boolean;

  constructor(id: string, name: string, body: string) {
    this.id = id;
    this.name = name;
    this.body = body;
    this.complete = false;
  }
}
