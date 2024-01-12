import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  message: string = '';
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public bsModalRef: BsModalRef) {}

  close(value: boolean): void {
    this.onClose.emit(value);
    this.bsModalRef.hide();
  }

  // Adicione este método para evitar o problema
  onCloseClick(value: boolean): void {
    this.close(value);
  }
}
