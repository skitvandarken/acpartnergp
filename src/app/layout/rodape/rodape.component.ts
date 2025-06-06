import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rodape',
  imports: [ TranslatePipe, CommonModule],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.css'
})
export class RodapeComponent {

      useLanguage(language: string): void {
          this.translate.use(language);
      }
      
      constructor(private translate: TranslateService) {}
      

}
