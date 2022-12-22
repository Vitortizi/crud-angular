import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ClientsService } from 'src/app/http/clients/clients.service';
import { UtilsService } from 'src/app/helpers/utils.helpers';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: any = [];
  thereIsaCar: boolean = false;

  constructor(private clientsService: ClientsService, private translate: TranslateService, public utils: UtilsService, private router: Router) { }

  ngOnInit(): void {
    this.clientsService.listClients().then(res => {
      if (res && res.length == 0) {
        this.users = [];
        this.thereIsaCar = true;

        return;
      }

      this.thereIsaCar = false;
      this.users = res;
    });
  }

  update(data: string) {
    this.router.navigate([`/update`], {queryParams: {data: JSON.stringify(data)}});
  }

  remove(userId: string) {
    this.clientsService.deleteUser({ userId }).then(res => {
      this.users = this.users.filter((obj: any )=> {return obj.userId !== userId});

      if (this.users.length == 0) {
        this.thereIsaCar = true;
      }
    });
  }
}
