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


    // console.log("FREQUENCY OF A: ", this.frequencyClient.getCharacterFrequency('a', Languages.EN));
    // console.log("MOST FREQUENT: ", this.frequencyClient.getMostFrequentCharacter(Languages.EN));

    // console.log("FREQUENCY TABLE PT: ", Array.from(this.frequencyClient.getFrequencyTable(Languages.PT)));
    // console.log("FREQUENCY TABLE EN: ", Array.from(this.frequencyClient.getFrequencyTable(Languages.EN)));

    // console.log("MAX KEY SIZE: ", this.frequencyClient.maxKeySize);




  }

  decypher(encryptedText: string) : string {
    const keyLenght = this.getKeyLength(encryptedText);
    return 'aaaaaa';
  }

  private getKeyLength(encryptedText: string) : number {
    console.log("1. Obtendo tamanho da chave...");
    const indexOfCoincidenceMap : Map<number, IocEntryModel> = new Map()

    for (let i = 1; i <= this.frequencyClient.maxKeySize; i++) {
      for (let j = 0; j < i; j++) {
        /**
         * monta uma substring concatenando cara i-ésimo caractere do texto cifrado, fazendo um shift dele
         * para garantir uma nova combinação a cada rodada
        */

        const substring = this.concatNthCharFromString(i, encryptedText.split('').slice(j).join(''))

        // desconsidera cadeias de caracteres muito pequenas
        if (substring.length < 3) continue;

        // console.log(`${i} - ${j}: ${substring}`);

        // calcula o indice de coincidencia pra substring
        const substrIoC = this.getIndexOfCoincidenceFromString(substring);

        // ignora indice de coincidencia se for zero
        if (substrIoC === 0) continue;

        if (indexOfCoincidenceMap.has(i)) {indexOfCoincidenceMap.get(i)!.add(substring, substrIoC);}
        else {indexOfCoincidenceMap.set(i, new IocEntryModel([substring], [substrIoC]))}
      }
    }

    console.log("MAP: ", indexOfCoincidenceMap);
    return 0;
  }

  private concatNthCharFromString(nthIndex: number, string: string): string {
    console.log("Obtendo substring...");

    let finalString = '';
    for (let index = 0; index < string.length; index += nthIndex) {
      finalString += string.charAt(index)
    }
    return finalString;
  }

  private getIndexOfCoincidenceFromString(string: string): number {
    const substringLenght = string.length;
    const letterFrequencies: Map<string, number> = new Map;

    string.split('').forEach((char:string) => {
      if (letterFrequencies.has(char)) {
        letterFrequencies.set(char, letterFrequencies.get(char)! + 1)
      }
      else {
        letterFrequencies.set(char, 1)
      }
    });

    // console.log(letterFrequencies);


    let sum = 0;
    Array.from(letterFrequencies.values()).forEach((frequency: number) => {
      // console.log("FREQ: ", frequency);

      sum += frequency * (frequency - 1)
    });

    return sum / (substringLenght * (substringLenght - 1))
  }
}
