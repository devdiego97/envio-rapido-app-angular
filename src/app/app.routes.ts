import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Envios } from './pages/envios/envios';
import { AddEnvio } from './pages/add-envio/add-envio';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/noauth-guard';
import { UpdateEnvio } from './pages/update-envio/update-envio';

export const routes: Routes = [
    {path:"",component: Login,
      canActivate:[noAuthGuard]
    }
    ,
    {path:"cadastro",component:Register,canActivate:[noAuthGuard]}
,
   {
    path: 'envios',
    loadComponent: () => import('./pages/envios/envios').then(m => m.Envios),
    canActivate: [authGuard]
  },
  
   {
    path: 'envios/atualizar/:id',
    loadComponent: () => import('./pages/update-envio/update-envio').then(m => m.UpdateEnvio),
    canActivate: [authGuard]
  },
{
  path: 'envios/novo-envio',
  loadComponent: () => import('./pages/add-envio/add-envio').then(m => m.AddEnvio),
  canActivate: [authGuard]
}
]