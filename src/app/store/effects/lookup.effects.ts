import { Injectable } from '@angular/core';
import { Customer, Lookups } from '@core/models';
import { LookupService } from '@core/services/lookup.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromLookup from '@store/actions/lookup.actions';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class LookupEffects {
  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromLookup.loadLookups),
      mergeMap((action) => {
        return this.lookupService.lookups().pipe(
          map((data: Lookups) =>
            fromLookup.loadLookupsSuccess({ payload: data })
          ),
          catchError((error: Error) =>
            of(fromLookup.loadLookupsFailure({ error }))
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private lookupService: LookupService
  ) {}
}
