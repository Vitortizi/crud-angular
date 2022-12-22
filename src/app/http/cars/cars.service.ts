import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CarsService {
  api = 'https://parallelum.com.br/fipe/api/v1/';

  constructor(private httpClient: HttpClient) {}

  getCarBrand(): Observable<any> {
    return this.httpClient.get(this.api + 'carros/marcas')
      .pipe(
        map((response: any) => {
          return response;
        }),
        retry(2),
        catchError(this.handleError<Body>('getCars')))
  }

  getCarModel(brandId: string): Observable<any> {
    return this.httpClient.get(this.api + `carros/marcas/${brandId}/modelos`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        retry(2),
        catchError(this.handleError<Body>('getCars')))
  }

  handleError<T>(operation = 'operation') {
    return (error: any) => {
      const err = error.error;

      return of({'success': err.success, 'Error': `${operation} failed: ${error.message}, ${err.msg}`, status: error.status});
    };
  }

}
