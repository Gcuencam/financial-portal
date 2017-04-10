import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SymbolsComponent} from "./pages/symbols/symbols.component";
import {SymbolComponent} from "./pages/symbol/symbol.component";

const appRoutes: Routes = [
    { path: 'symbols', component: SymbolsComponent},
    { path: 'symbol/:id', component: SymbolComponent },
    { path: '', redirectTo: 'symbols', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
