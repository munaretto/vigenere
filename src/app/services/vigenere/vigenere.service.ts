import { Injectable } from '@angular/core';
import { concat } from 'rxjs';
import { Languages } from 'src/app/enums/languages.enum';
import { IocEntryModel } from 'src/app/models/ioc-entry.model';
import { Frequency } from 'src/app/utils/frequency.utils';

@Injectable({
  providedIn: 'root'
})
export class VigenereService {

  private frequencyClient = new Frequency();

  constructor() {


    console.log("FREQUENCY OF A: ", this.frequencyClient.getCharacterFrequency('a', Languages.EN));
    console.log("MOST FREQUENT: ", this.frequencyClient.getMostFrequentCharacter(Languages.EN));

    console.log("FREQUENCY TABLE PT: ", Array.from(this.frequencyClient.getFrequencyTable(Languages.PT)));
    console.log("FREQUENCY TABLE EN: ", Array.from(this.frequencyClient.getFrequencyTable(Languages.EN)));

    console.log("MAX KEY SIZE: ", this.frequencyClient.maxKeySize);




  }

  decypher(encryptedText: string) : string {
    const keyLenght = this.getKeyLength(encryptedText);
    return 'aaaaaa';
  }

  private getKeyLength(encryptedText: string) : number {
    const indexOfCoincidenceMap : Map<number, IocEntryModel> = new Map()
    console.log("ENCRYPTED TEXT: ", encryptedText);



    for (let i = 1; i <= this.frequencyClient.maxKeySize; i++) {
      for (let j = 0; j < i; j++) {
        /**
         * monta uma substring concatenando cara i-ésimo caractere do texto cifrado, fazendo um shift dele
         * para garantir uma nova combinação a cada rodada
        */

        const substring = this.concatNthCharFromString(i, encryptedText.split('').slice(j).join(''))

        // desconsidera cadeias de caracteres muito pequenas
        if (substring.length < 3) continue;

        console.log(`${i} - ${j}: ${substring}`);

        // calcula o indice de coincidencia pra substring
        const substrIoC = this.getIndexOfCoincidenceFromString(substring);

        // ignora indice de coincidencia se for zero
        // if (substrIoC === 0) continue;

        if (indexOfCoincidenceMap.has(i)) {indexOfCoincidenceMap.get(i)!.add(substring);}
        else {indexOfCoincidenceMap.set(i, new IocEntryModel([substring]))}
      }


      console.log("MAP: ", indexOfCoincidenceMap);



    }
    return 0;
  }

  // xlljgwfbewcw

  // i = 2

  // 2 - 0 = x l g f e c
  // 2 - 1 = l j w b w w

  /**
   *
   * 3 - 0 = x j f w
   * 3 - 1 = l g b c
   * 3 - 2 = l w e w
   */
  private concatNthCharFromString(nthIndex: number, string: string): string {
    let finalString = '';
    for (let index = 0; index < string.length; index += nthIndex) {
      finalString += string.charAt(index)
    }
    return finalString;
  }

  private getIndexOfCoincidenceFromString(string: string): number {
    return 0;
  }
}
