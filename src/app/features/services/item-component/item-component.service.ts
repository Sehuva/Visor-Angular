import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { Global } from '@shared/utility/global';

@Injectable({
  providedIn: 'root'
})
export class ItemComponentService {

  constructor(
    private httpService: HttpServiceService,
    private global: Global
  ) { }

  get():Observable<any>{
    let url = `${environment.api.minka}item-component`;
    return this.httpService.get<any>(url);
  }

  getById(id: any): Observable<any> {
    let url = `${environment.api.minka}item-component/${id}`;
    return this.httpService.get<any>(url);
  }

  pagination(params: any):Observable<any>{
    let url = `${environment.api.minka}item-component/pagination?${this.global.formatParameter(params)}`;
    return this.httpService.get<any>(url);
  }

  post(body: any): Observable<any> {
    let url = `${environment.api.minka}item-component`;
    return this.httpService.post<any>(`${url}`, body);
  }

  put(body: any): Observable<any> {
    let url = `${environment.api.minka}item-component`;
    return this.httpService.put<any>(`${url}`, body);
  }

  updateState(body: any): Observable<any> {
    let url = `${environment.api.minka}item-component/update-state`;
    return this.httpService.put<any>(`${url}`, body);
  }
}