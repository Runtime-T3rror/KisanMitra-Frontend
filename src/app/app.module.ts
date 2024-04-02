import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetectComponent } from './components/pages/detect/detect.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { ServerService } from './services/api/server.service';

const appRoutes: Routes = [
  {
    path: 'detect',
    component: DetectComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DetectComponent,
    InventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
