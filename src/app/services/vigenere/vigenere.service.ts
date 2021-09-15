import { Injectable } from '@angular/core';
import { Languages } from 'src/app/enums/languages.enum';
import { Frequency } from 'src/app/utils/frequency.utils';

@Injectable({
  providedIn: 'root'
})
export class VigenereService {

  constructor() {
    const frequencyClient = new Frequency();

    console.log("FREQUENCY OF A: ", frequencyClient.getCharacterFrequency('a', Languages.EN));
    console.log("MOST FREQUENT: ", frequencyClient.getMostFrequentCharacter(Languages.EN));

    console.log("FREQUENCY TABLE PT: ", Array.from(frequencyClient.getFrequencyTable(Languages.PT)));
    console.log("FREQUENCY TABLE EN: ", Array.from(frequencyClient.getFrequencyTable(Languages.EN)));

    console.log("MAX KEY SIZE: ", frequencyClient.maxKeySize);




  }

  decypher() : string {
    const keyLenght = this.getKeyLength();
    return 'aaaaaa';
  }

  private getKeyLength() : number {
    return 0;
  }
}
