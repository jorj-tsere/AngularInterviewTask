import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env';
import * as fromAuth from './reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AlertEffects } from './effects/alert.effects';
import { RouteEffects } from './effects/route.effects';
import * as fromCustomer from './reducers/customer.reducer';
import { CustomerEffects } from './effects/customer.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './custom-route-serializer';
import { LookupEffects } from './effects/lookup.effects';
import * as fromLookup from './reducers/lookup.reducer';
import { AccountEffects } from './effects/account.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreDevtoolsModule.instrument({
      maxAge: 30,
      logOnly: environment.production,
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    StoreModule.forFeature(fromLookup.lookupFeatureKey, fromLookup.reducer),
    StoreModule.forFeature(
      fromCustomer.customersFeatureKey,
      fromCustomer.reducer
    ),
    EffectsModule.forRoot([AlertEffects, RouteEffects]),
    EffectsModule.forFeature([
      AuthEffects,
      LookupEffects,
      CustomerEffects,
      AccountEffects,
    ]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
  ],
})
export class CoreStoreModule {}
