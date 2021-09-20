export class IocEntryModel {
  private _substrings: string[];

  constructor(subs: string[]) {
    this._substrings = subs;
  }

  get iocSubstrAverage() {
    return 2;
  }

  get substrings() {
    return this._substrings
  }

  add(newSubst: string) {
    this._substrings.push(newSubst)
  }


}
