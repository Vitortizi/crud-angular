import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export interface UserProps {
  userId?: string;
  name: string;
  cpf: string;
  telephone: string;
  birth_date: string;
  address: string;
  vehicle?: {
    brandVehicle: {},
    modelVehicle: {}
  };
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserId {
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  _id: any;

  constructor() { }

  async listClients(): Promise<any> {
    var obj = [];

    for (let [key, res] of Object.entries(localStorage)) {
      obj.push(
        JSON.parse(res),
      );
    }

    return obj;
  }

  async addUser(request: UserProps): Promise<any> {
    this._id = uuidv4();

    localStorage.setItem(
      this._id,
      JSON.stringify({
        ...request,
        userId: this._id,
        createdAt: new Date()
      })
    );

    return;
  }

  async putUser(id: string, request: UserProps): Promise<any> {
    localStorage.setItem(
      id,
      JSON.stringify({
        ...request,
        userId: id,
        createdAt: request.createdAt ?? new Date(),
        updatedAt: new Date()
      })
    );

    return;
  }

  async deleteUser(_id: UserId): Promise<any> {
    localStorage.removeItem(_id.userId);
    return;
  }
}
