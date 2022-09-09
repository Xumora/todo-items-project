import { TestBed } from "@angular/core/testing";
import { HandleErrorService } from "./handle-error.service"

describe('HandleErrorService', () => {
    let handleErrorService: HandleErrorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HandleErrorService]
        })
        handleErrorService = TestBed.inject(HandleErrorService);
    })

    it('should set errorMessage - handleError method', () => {
        spyOn(handleErrorService.errorMessage, 'next');
        handleErrorService.handleError('Unauthorized');
        expect(handleErrorService.errorMessage.next).withContext('handleError method did not work')
            .toHaveBeenCalledWith('You did not authorized')
    })
})