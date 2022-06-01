import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RechercheComponent } from '../list/recherche.component';
import { RechercheDetailComponent } from '../detail/recherche-detail.component';
import { RechercheUpdateComponent } from '../update/recherche-update.component';
import { RechercheRoutingResolveService } from './recherche-routing-resolve.service';

const rechercheRoute: Routes = [
  {
    path: '',
    component: RechercheComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RechercheDetailComponent,
    resolve: {
      recherche: RechercheRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RechercheUpdateComponent,
    resolve: {
      recherche: RechercheRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RechercheUpdateComponent,
    resolve: {
      recherche: RechercheRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rechercheRoute)],
  exports: [RouterModule],
})
export class RechercheRoutingModule {}
