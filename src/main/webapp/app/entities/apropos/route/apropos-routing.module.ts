import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AproposComponent } from '../list/apropos.component';
import { AproposDetailComponent } from '../detail/apropos-detail.component';
import { AproposUpdateComponent } from '../update/apropos-update.component';
import { AproposRoutingResolveService } from './apropos-routing-resolve.service';

const aproposRoute: Routes = [
  {
    path: '',
    component: AproposComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AproposDetailComponent,
    resolve: {
      apropos: AproposRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AproposUpdateComponent,
    resolve: {
      apropos: AproposRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AproposUpdateComponent,
    resolve: {
      apropos: AproposRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(aproposRoute)],
  exports: [RouterModule],
})
export class AproposRoutingModule {}
