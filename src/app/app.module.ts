import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DeviceModule } from '@ngx-toolkit/device';
import { environment } from '../environments/environment';
import { AppApiClientService } from './app-api-client.service';
import { AppRoutingModule } from './app-routing.module';
import { AppAdapter } from './app.adapter';
import { AppComponent } from './app.component';
import { AppSandbox } from './app.sandbox';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Third Party Modules
    DeviceModule.forRoot(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     */
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    /**
     * Core module contains providers for the singleton services you
     * load when the application starts.
     *
     * https://angular.io/guide/ngmodule-faq#what-kinds-of-modules-should-i-have-and-how-should-i-use-them
     */
    CoreModule,
    SharedModule,
  ],
  providers: [AppSandbox, AppApiClientService, AppAdapter],
  bootstrap: [AppComponent],
})
export class AppModule {}
