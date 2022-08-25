import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() message = '';
  @Input() isError = false;
  @Output() modalClosed = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.modalClosed.emit()
  }
}
