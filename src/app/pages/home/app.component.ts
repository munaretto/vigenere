import { Component } from '@angular/core';
import { VigenereService } from 'src/app/services/vigenere/vigenere.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vigenere';
  decryptedText: string = ''
  encryptedText: string = 'mlgzhpauroobz';
  customPassword: string = '';

  constructor(private vigenere: VigenereService) {


    // this.decryptedText = this.vigenere.decypher(this.encryptedText);
  }

  onFileChange(file : any) {
    // console.log("FILE: ", );
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // console.log("content: ", fileReader.result);
      this.decryptedText = this.vigenere.decypher(fileReader.result as string)
    }
    fileReader.readAsText(file.target.files[0]);

  }
}
