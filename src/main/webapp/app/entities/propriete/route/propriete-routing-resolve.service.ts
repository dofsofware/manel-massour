import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPropriete, Propriete } from '../propriete.model';
import { ProprieteService } from '../service/propriete.service';

@Injectable({ providedIn: 'root' })
export class ProprieteRoutingResolveService implements Resolve<IPropriete> {
  constructor(protected service: ProprieteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPropriete> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((propriete: HttpResponse<Propriete>) => {
          if (propriete.body) {
            return of(propriete.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Propriete());
  }
}
