import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { authRoutes } from './core/auth/auth.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/interceptors/auth-refresh.interceptor';
import { booksRoute } from './features/books/books.routes';
import { adminRoute } from './features/admin/pages/admin.routes';

const routes = [...authRoutes, ...adminRoute, ...booksRoute]

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
};
