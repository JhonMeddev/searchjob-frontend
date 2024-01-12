import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertsComponent } from '../alerts/alerts.component';
import { Observable, Subject } from 'rxjs';
import { ConfirmationComponent } from '../alerts/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private bsModalService: BsModalService) { }

  private showAlert(message: string, tipo: string){
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertsComponent)
    bsModalRef.content.type = tipo
    bsModalRef.content.message = message
  }

  showAlertDanger(message: string ){
    this.showAlert(message,'danger')
  }

  showAlertSuccess(message:string ){
    this.showAlert(message, 'success')
  }

  showAlertInfo(message:string){
    this.showAlert(message, 'info')
  } 

  showAlertSec(message:string){
    this.showAlert(message, 'secondary')
  }

  showConfirmation(message: string): Observable<boolean> {
    const confirmationSubject = new Subject<boolean>();

    const bsModalRef: BsModalRef = this.bsModalService.show(ConfirmationComponent, {
      initialState: {
        message: message
      }
    });

    bsModalRef.content.onClose.subscribe((result: boolean) => {
      confirmationSubject.next(result);
      confirmationSubject.complete();
    });

    return confirmationSubject.asObservable();
  }

}
