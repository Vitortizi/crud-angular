import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cars';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'pt-br']);
    translate.setDefaultLang('pt-br');
    translate.use('pt-br');
  }
}
