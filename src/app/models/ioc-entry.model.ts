export class IocEntryModel {
  private _substrings: string[];
  private _substrings_ioc: number[];
  private _ioc_avg: number = 0;

  constructor(subs: string[], subs_ioc: number[]) {
    this._substrings = subs;
    this._substrings_ioc = subs_ioc;
  }

  get iocSubstrAverage() {
    return this._ioc_avg
  }

  calculateAvgIoC() {
    this._ioc_avg = this._substrings_ioc.reduce((a, b) => (a + b)) / this._substrings_ioc.length;
  }

  get substrings() {
    return this._substrings
  }

  add(newSubst: string, newSubstring: number) {
    this._substrings.push(newSubst);
    this._substrings_ioc.push(newSubstring);
  }


}
