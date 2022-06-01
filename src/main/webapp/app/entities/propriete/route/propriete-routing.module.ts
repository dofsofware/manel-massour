import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProprieteComponent } from '../list/propriete.component';
import { ProprieteDetailComponent } from '../detail/propriete-detail.component';
import { ProprieteUpdateComponent } from '../update/propriete-update.component';
import { ProprieteRoutingResolveService } from './propriete-routing-resolve.service';

const proprieteRoute: Routes = [
  {
    path: '',
    component: ProprieteComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProprieteDetailComponent,
    resolve: {
      propriete: ProprieteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProprieteUpdateComponent,
    resolve: {
      propriete: ProprieteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProprieteUpdateComponent,
    resolve: {
      propriete: ProprieteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(proprieteRoute)],
  exports: [RouterModule],
})
export class ProprieteRoutingModule {}
