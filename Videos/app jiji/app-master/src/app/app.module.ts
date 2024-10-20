import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular'; 
import { DatabaseService } from './services/database.service'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Importa SQLite

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,              
    IonicModule.forRoot(),      
    AppRoutingModule,           
    IonicStorageModule.forRoot() 
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatabaseService,
    SQLite // Registra SQLite como proveedor
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
