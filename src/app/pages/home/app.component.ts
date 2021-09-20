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
  encryptedText: string = 'xlljgwfbewcw';

  constructor(private vigenere: VigenereService) {
    this.decryptedText = this.vigenere.decypher(this.encryptedText);
  }
}
