import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.routing";

import { AppComponent } from "./app.component";
import { UserInfoComponent } from "../app/user-info/user-info.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { CountryInfoComponent } from './country-info/country-info.component';

@NgModule({
   declarations: [
      AppComponent,
      UserInfoComponent,
      CountryInfoComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatCardModule,
      MatFormFieldModule,
      MatButtonModule,
      MatDialogModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
