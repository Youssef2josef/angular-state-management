import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from "@ngrx/router-store";

import { routes } from './app.routes';
import { studentsReducer } from "./state/students.reducer";
import { StudentsRecordsEffects } from "./state/students-records.effects";
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideEffects(StudentsRecordsEffects),
    provideStore({
      route: routerReducer
    }),
    provideState({
        name: 'students',
        reducer: studentsReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideRouterStore(),
    importProvidersFrom(MatNativeDateModule),
]
};