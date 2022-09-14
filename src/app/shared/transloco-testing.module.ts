import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
import en from '../../assets/i18n/en.json';
import ru from '../../assets/i18n/ru.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
    return TranslocoTestingModule.forRoot({
        langs: { en, ru },
        translocoConfig: {
            availableLangs: ['en', 'ru'],
            defaultLang: 'en',
        },
        preloadLangs: true,
        ...options
    });
}