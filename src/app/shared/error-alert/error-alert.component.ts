import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent {
  @Input() message = '';
  @Output() modalClosed = new EventEmitter<void>()

  public onClose(): void {
    this.modalClosed.emit()
  }
}
