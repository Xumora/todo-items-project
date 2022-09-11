import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HandleErrorService {
  errorMessage = new Subject<null | string>();

  public handleError(err: string): void {
    let errorMsg = '';
    switch (err) {
      case 'Unauthorized':
        errorMsg = 'You did not authorized';
        break;
      default:
        break;
    }
    this.errorMessage.next(errorMsg);
  }
}
