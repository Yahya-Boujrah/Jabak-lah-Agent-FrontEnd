import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AgentInfosComponent } from './components/agent-infos/agent-infos.component';
import { AuthInterceptorService } from './services/Auth-interceptor.service';
import { DemandsComponent } from './components/demands/demands.component';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    ClientsComponent,
    AgentInfosComponent,
    DemandsComponent,
    ChangePwdComponent,
    ProductsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass : AuthInterceptorService, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
