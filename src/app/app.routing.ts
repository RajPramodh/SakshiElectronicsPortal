import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    { path: '', redirectTo:'authentication', pathMatch: 'full'},
    { path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService] },
    { path: 'authentication', loadChildren: () => import('../app/authentication/authentication.module').then(m => m.AuthenticationModule) }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });