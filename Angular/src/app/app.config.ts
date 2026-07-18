import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth-interceptor';
import { AuthService } from './auth/auth-service';
import { MessageService } from 'primeng/api';
import { jwtInterceptor } from './transport/jwt-interceptor';

const promptPreset = definePreset(Aura, { /*
  - On se base sur 'Aura' pour créer notre propre thème et permet de personnaliser tous les composants de 'primeng'
*/
  semantic: {
    primary: { /*
        - On customise tous ce qui est primaire
      */
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    }
  },
  components: {
    progressspinner: {
      colorScheme: {
        light: {
          root: {
            colorOne: '{primary.500}',
            colorTwo: '{primary.500}',
            colorThree: '{primary.500}',
            colorFour: '{primary.500}'
          }
        },
        dark: {
          root: {
            colorOne: '{primary.500}',
            colorTwo: '{primary.500}',
            colorThree: '{primary.500}',
            colorFour: '{primary.500}'
          }
        }
      }
    }
  }
})

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()), /*
      - Va provide les routes de notre application
    */
    providePrimeNG({
        theme: {
            preset: promptPreset, // Ou.. 'Aura' par défaut
            options: {
              darkModeSelector: '.dark' /*
                - 'On indique que si la class '.dark' est sur le 'html' on bascule en mode sombre et on a ajouter le bouton de bascule dans la 'navbar'
              */
            }
        }
    }),

    provideHttpClient(withInterceptors([authInterceptor, jwtInterceptor])),
    provideAppInitializer(() => inject(AuthService).loadCurrentUser()),
    MessageService // Puis dans 'app.html'
  ]
};
