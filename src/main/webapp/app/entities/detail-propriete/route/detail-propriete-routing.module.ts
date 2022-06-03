import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DetailProprieteComponent } from '../list/detail-propriete.component';
import { DetailProprieteDetailComponent } from '../detail/detail-propriete-detail.component';
import { DetailProprieteUpdateComponent } from '../update/detail-propriete-update.component';
import { DetailProprieteRoutingResolveService } from './detail-propriete-routing-resolve.service';

const detailProprieteRoute: Routes = [
  {
    path: '',
    component: DetailProprieteComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetailProprieteDetailComponent,
    resolve: {
      detailPropriete: DetailProprieteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetailProprieteUpdateComponent,
    resolve: {
      detailPropriete: DetailProprieteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetailProprieteUpdateComponent,
    resolve: {
      detailPropriete: DetailProprieteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(detailProprieteRoute)],
  exports: [RouterModule],
})
export class DetailProprieteRoutingModule {}
