import { keyframes } from '@angular/animations';
import { Injectable } from '@angular/core';
import { concat } from 'rxjs';
import { ALPHABET, ASCII_TABLE_LOWERCASE, MARGIN_OF_ERROR, PT_FREQUENCY_TABLE, PT_INDEX_OF_COINCIDENCE } from 'src/app/constants/frequency.const';
import { Languages } from 'src/app/enums/languages.enum';
import { IocEntryModel } from 'src/app/models/ioc-entry.model';
import { Frequency } from 'src/app/utils/frequency.utils';

@Injectable({
  providedIn: 'root'
})
export class VigenereService {

  private frequencyClient: Frequency;
  private indexOfCoincidenceMap : Map<number, IocEntryModel>;

  constructor() {
    this.frequencyClient = new Frequency();
    this.indexOfCoincidenceMap = new Map()
  }

  private reset() {
    this.indexOfCoincidenceMap = new Map()
  }

  decypher(encryptedText: string) : string {
    this.reset();
    console.log("1. Obtendo tamanho da chave...");
    const keyLength = this.getKeyLength(encryptedText);
    console.log("  > Tamanho da chave: ", keyLength);
    console.log("2. Obtendo caracteres da chave...");
    const password = this.getPasswordCharacters(keyLength);
    console.log("  > Chave: ", password);
    console.log("3. Tentando decifrar o texto cifrado...");
    const plainText = this.decypherText(encryptedText, password);
    console.log("  > Texto decifrado: ", plainText);

    return plainText;
  }

  private mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  private decypherText(encryptedText: string, password: string): string {
    let decryptedText = '';

    for (let index = 0; index < encryptedText.length; index++) {
      const dif = encryptedText[index].charCodeAt(0) - password[this.mod(index,password.length)].charCodeAt(0)
      decryptedText += ALPHABET.get(this.mod(dif,26))
    }
    return decryptedText;
  }

  /**
   *
   * @param keyLength
   * @returns
   */
  private getPasswordCharacters(keyLength: number): string {
    const mapEntry = this.indexOfCoincidenceMap.get(keyLength)!;
    let password = '';
    mapEntry.substrings.forEach((substring: string) => {
      const mostCommonChars = this.findTwoMostFrequentCharacters(substring)
      password += mostCommonChars.second[0]
    })
    return password;
  }

  /**
   * Dado uma string, este método tem como função encontrar os dois caracteres mais frequentes
   *
   * @param string a string que se deseja analisar
   * @returns um objeto contendo os dois caracteres mais frequentes da string
   */
  private findTwoMostFrequentCharacters(string: string): {first: any[], second: any[]} {
    const letterFrequencies: Map<string, number> = new Map;

    string.split('').forEach((char:string) => {
      if (letterFrequencies.has(char)) {
        letterFrequencies.set(char, letterFrequencies.get(char)! + 1)
      }
      else {
        letterFrequencies.set(char, 1)
      }
    });

    const arr = Array.from(letterFrequencies.entries()).sort((a,b) => a[1] - b[1])

    return {
      first: arr[arr.length - 1],
      second: arr[arr.length - 2]
    }
  }

  /**
   * Este método é o responsável por buscar o tamanho da chave através da aplicação da técnica de índice de coincidencia
   *
   * @param encryptedText o texto cifrado
   * @returns o tamanho da chave
   */
  private getKeyLength(encryptedText: string) : number {
    for (let i = 1; i <= this.frequencyClient.maxKeySize; i++) {
      for (let j = 0; j < i; j++) {
        // monta uma substring concatenando cada i-ésimo caractere do texto cifrado
        const substring = this.concatNthCharFromString(i, encryptedText.split('').slice(j).join(''))

        // desconsidera cadeias de caracteres muito pequenas
        if (substring.length < 3) continue;

        // calcula o indice de coincidencia pra substring
        const substrIoC = this.getIndexOfCoincidenceFromString(substring);

        // ignora indice de coincidencia se for zero
        if (substrIoC === 0) continue;

        if (this.indexOfCoincidenceMap.has(i)) {this.indexOfCoincidenceMap.get(i)!.add(substring, substrIoC);}
        else {this.indexOfCoincidenceMap.set(i, new IocEntryModel([substring], [substrIoC]))}
      }

      // calcula a média dos indices de coincidencia das substrings para facilitar a comparação posteriormente
      const mapEntry = this.indexOfCoincidenceMap.get(i);
      mapEntry!.calculateAvgIoC();

      // se a média de IoC para esse conjunto de substrings está no range aceitavel para o IoC da lingua portuguesa, assumo que o tamanho da chave é i
      if (mapEntry!.iocSubstrAverage >= PT_INDEX_OF_COINCIDENCE && mapEntry!.iocSubstrAverage <= PT_INDEX_OF_COINCIDENCE + MARGIN_OF_ERROR) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Função responsável por concatenar cada nthIndex caractere da string
   *
   * @param nthIndex numero indicando o pulo dado para pegar cada caractere
   * @param string a string a ser operada
   * @returns uma substring formada por cada nthIndex caractere concatenado
   */
  private concatNthCharFromString(nthIndex: number, string: string): string {
    let finalString = '';
    for (let index = 0; index < string.length; index += nthIndex) {
      finalString += string.charAt(index)
    }
    return finalString;
  }

  /**
   * Esta função tem como objetivo pgar o indice de coincidencia para a string fornecida
   * @param string string que se deseja saber o IoC
   * @returns o índice de coincidencia da string
   */
  private getIndexOfCoincidenceFromString(string: string): number {
    const substringLength = string.length;
    const letterFrequencies: Map<string, number> = new Map;

    // conta as ocorrencias de cada char em um map
    string.split('').forEach((char:string) => {
      if (letterFrequencies.has(char)) {
        letterFrequencies.set(char, letterFrequencies.get(char)! + 1)
      }
      else {
        letterFrequencies.set(char, 1)
      }
    });

    let sum = 0;
    Array.from(letterFrequencies.values()).forEach((frequency: number) => {
      sum += frequency * (frequency - 1)
    });

    return sum / (substringLength * (substringLength - 1))
  }
}
