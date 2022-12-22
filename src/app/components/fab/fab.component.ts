import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {

  enIsNavActive: boolean = false;

  constructor(private translate: TranslateService) {
  }
  
  ngOnInit(): void {
  }

  useLanguage(language: string): void {
    if (this.translate.currentLang != language) {
      this.enIsNavActive = !this.enIsNavActive;
      this.translate.use(language);
    }
  }
}
