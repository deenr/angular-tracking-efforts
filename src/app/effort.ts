export class Effort {
  private _id: number;
  private _description: string;
  private _category: string;
  private _createdAt: string;
  private _URL?: string | undefined;
  private _time?: number | undefined;

  public constructor (
    _id: number,
    _description: string,
    _category: string,
    _createdAt: string,
    _URL?: string,
    _time?: number,
  ) {
    this._id = _id;
    this._description = _description;
    this._category = _category;
    this._createdAt = _createdAt;
    this._URL = _URL;
    this._time = _time;
  }

  public get id(): number {
    return this._id;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public get category(): string {
    return this._category;
  }
  public set category(value: string) {
    this._category = value;
  }
  public get createdAt(): string {
    return this._createdAt;
  }
  public set createdAt(value: string) {
    this._createdAt = value;
  }
  public get URL(): string | undefined {
    return this._URL;
  }
  public set URL(value: string | undefined) {
    this._URL = value;
  }
  public get time(): number | undefined {
    return this._time;
  }
  public set time(value: number | undefined) {
    this._time = value;
  }

  public toJSON(): JSON {
    return ({
      id: this._id,
      description: this._description,
      category: this._category,
      createdAt: this._createdAt,
      URL: this._URL,
      time: this._time,
    } as any) as JSON;
  }

  public static fromJSON(effortJSON: any): Effort {
    return new Effort(
      effortJSON.id,
      effortJSON.description,
      effortJSON.category,
      effortJSON.createdAt,
      effortJSON.URL,
      effortJSON.time
    );
  }
}
