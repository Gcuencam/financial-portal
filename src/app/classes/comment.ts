import { UUID } from 'angular2-uuid';

export class CommentSymbol {

  private _id: UUID;
  private _symbolId: number;
  private _date: Date;
  private _comment: String;
  private _fecha: String;
  private _hora: String;
  private _disabled: Boolean;

  constructor(symbolId: number, date: Date, comment: String) {
    this._id = UUID.UUID();
    this._symbolId = symbolId;
    this._date = date;
    this._comment = comment;
    this._fecha = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
    this._hora = date.getHours() + ":" + date.getMinutes();
    this._disabled = true;
  }

  get id(): UUID {
    return this._id;
  }

  set id(value: UUID) {
    this._id = value;
  }

  get symbolId(): number {
    return this._symbolId;
  }

  set symbolId(value: number) {
    this._symbolId = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get comment(): String {
    return this._comment;
  }

  set comment(value: String) {
    this._comment = value;
  }


  get fecha(): String {
    return this._fecha;
  }

  set fecha(value: String) {
    this._fecha = value;
  }

  get hora(): String {
    return this._hora;
  }

  set hora(value: String) {
    this._hora = value;
  }


  get disabled(): Boolean {
    return this._disabled;
  }

  set disabled(value: Boolean) {
    this._disabled = value;
  }
}
