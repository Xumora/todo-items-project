import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() message = '';
  @Input() isError = false;
  @Output() modalClosed = new EventEmitter<void>()

  public onClose(): void {
    this.modalClosed.emit()
  }
}
