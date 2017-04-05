import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SymbolsComponent} from "./pages/symbols/symbols.component";

const appRoutes: Routes = [
    { path: 'symbols',
        component: SymbolsComponent,
    },
    { path: '', redirectTo: 'symbols', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
