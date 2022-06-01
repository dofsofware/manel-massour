import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRecherche, Recherche } from '../recherche.model';
import { RechercheService } from '../service/recherche.service';

@Injectable({ providedIn: 'root' })
export class RechercheRoutingResolveService implements Resolve<IRecherche> {
  constructor(protected service: RechercheService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecherche> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((recherche: HttpResponse<Recherche>) => {
          if (recherche.body) {
            return of(recherche.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Recherche());
  }
}
