import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './componenti/landing/landing.component';
import { LoginComponent } from './componenti/login/login.component';
import { AdminPageComponent } from './componenti/admin-page/admin-page.component';
import { TrattamentiComponent } from './componenti/trattamenti/trattamenti.component';
import { RecensioniComponent } from './componenti/recensioni/recensioni.component';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'adminPage', component: AdminPageComponent,},
  { path: 'login', component: LoginComponent,},
  { path: 'recensioni', component: RecensioniComponent,},

  { path: 'trattamenti/:categoria/:tipo', component: TrattamentiComponent,}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
