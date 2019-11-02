import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './shared/store/index';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DeviceModule } from '@ngx-toolkit/device';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NetworkEffects } from './shared/store/effects/network.effects';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppSandbox } from './app.sandbox';

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
		 * StoreModule.forRoot() is imported once in the root module,
		 * accepting reducers and meta-reducers
		 *
		 */
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
			},
		}),

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
		 * Effect Modules that are loaded when application starts
		 */
		EffectsModule.forRoot([NetworkEffects]),

		/**
		 * Core module contains providers for the singleton services you
		 * load when the application starts.
		 *
		 * https://angular.io/guide/ngmodule-faq#what-kinds-of-modules-should-i-have-and-how-should-i-use-them
		 */

		CoreModule,
		SharedModule,
	],
	providers: [AppSandbox],
	bootstrap: [AppComponent],
})
export class AppModule {}
