import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { AprobacionComponent } from './aprobacion/aprobacion.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'proveedor', component: ProveedorComponent, canActivate: [AuthGuard] },
  { path: 'solicitud', component: SolicitudComponent, canActivate: [AuthGuard] },
  { path: 'aprobacion', component: AprobacionComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
