import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IApropos, Apropos } from '../apropos.model';
import { AproposService } from '../service/apropos.service';

@Injectable({ providedIn: 'root' })
export class AproposRoutingResolveService implements Resolve<IApropos> {
  constructor(protected service: AproposService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApropos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((apropos: HttpResponse<Apropos>) => {
          if (apropos.body) {
            return of(apropos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Apropos());
  }
}
