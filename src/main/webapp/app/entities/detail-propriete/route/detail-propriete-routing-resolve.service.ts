import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDetailPropriete, DetailPropriete } from '../detail-propriete.model';
import { DetailProprieteService } from '../service/detail-propriete.service';

@Injectable({ providedIn: 'root' })
export class DetailProprieteRoutingResolveService implements Resolve<IDetailPropriete> {
  constructor(protected service: DetailProprieteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetailPropriete> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((detailPropriete: HttpResponse<DetailPropriete>) => {
          if (detailPropriete.body) {
            return of(detailPropriete.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DetailPropriete());
  }
}
