import { Injectable } from '@angular/core';
import { translate } from '@ngneat/transloco';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HandleErrorService {
  public errorMessage = new Subject<null | string>();

  public handleError(err: string): void {
    let errorMsg = translate('handleError.default');
    switch (err) {
      case 'Unauthorized':
        errorMsg = errorMsg + translate('handleError.unauthorized');
        break;
      default:
        break;
    }
    this.errorMessage.next(errorMsg);
  }
}
