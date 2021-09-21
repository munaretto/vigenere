export class IocEntryModel {
  private _substrings: string[];
  private _substrings_ioc: number[];

  constructor(subs: string[], subs_ioc: number[]) {
    this._substrings = subs;
    this._substrings_ioc = subs_ioc;
  }

  get iocSubstrAverage() {
    return 2;
  }

  get substrings() {
    return this._substrings
  }

  add(newSubst: string, newSubstring: number) {
    this._substrings.push(newSubst);
    this._substrings_ioc.push(newSubstring);
  }


}
