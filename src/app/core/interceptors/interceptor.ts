import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Modal } from '@shared/utility/modal';
import { Global } from '@shared/utility/global';
import { NzMessageService } from 'ng-zorro-antd';
import { catchError } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  
    constructor(
        private modal: Modal,
        private global: Global,
        private message: NzMessageService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
            console.log(error);
            if (error instanceof HttpErrorResponse) {
                if(error?.status === 400)
                {
                    this.modal.warning(this.global.fetchResponseErrors(error['errors']));
                    return throwError(error);
                }
                else 
                {
                    this.message.error('Lo sentimos, ocurrió un error inesperado.');
                    return throwError(error);
                }
            } else {
                return throwError(error);
            }
        }));
    }
}
