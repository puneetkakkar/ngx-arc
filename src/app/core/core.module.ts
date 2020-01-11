import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store';
import { DummyEffects } from './store/effects/dummy.effects';
import { NetworkEffects } from './store/effects/network.effects';

@NgModule({
  declarations: [],
  imports: [
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
     * Effect Modules that are loaded when application starts
     */
    EffectsModule.forRoot([NetworkEffects, DummyEffects]),
  ],
  exports: [],
  providers: [],
})
export class CoreModule {}
