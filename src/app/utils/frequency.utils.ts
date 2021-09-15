import { EN_FREQUENCY_TABLE, PT_FREQUENCY_TABLE } from "../constants/frequency.const";
import { Languages } from "../enums/languages.enum";
import { MostFrequentChar } from "../interfaces/most-frequent-char.interface";

export class Frequency {

  private readonly MAX_KEY_SIZE = 26;

  getFrequencyTable(language: Languages) : Map<string, number> {
    return language === Languages.EN ? EN_FREQUENCY_TABLE : PT_FREQUENCY_TABLE;
  }

  getCharacterFrequency(char: string, language: Languages) : number {
    const table : Map<string, number> = this.getFrequencyTable(language);
    return table.get(char)!;
  }

  getMostFrequentCharacter(language: Languages) : MostFrequentChar {
    const table = this.getFrequencyTable(language);
    const mostFrequentChar = Array.from(table).sort((a,b) => b[1]-a[1])[0]

    return {
      char: mostFrequentChar[0], frequency: mostFrequentChar[1]
    }
  }

  get maxKeySize() : number {
    return this.MAX_KEY_SIZE;
  }


}
