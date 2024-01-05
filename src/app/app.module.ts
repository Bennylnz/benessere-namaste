
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './componenti/landing/landing.component';
import { LoginComponent } from './componenti/login/login.component';
import { AdminPageComponent } from './componenti/admin-page/admin-page.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';  
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {TextFieldModule} from '@angular/cdk/text-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree';

import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { TrattamentiComponent } from './componenti/trattamenti/trattamenti.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './componenti/footer/footer.component';








@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    AdminPageComponent,
    NavbarComponent,
    TrattamentiComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    TextFieldModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    ToastrModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatMenuModule
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
