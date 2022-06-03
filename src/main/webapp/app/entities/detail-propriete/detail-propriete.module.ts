import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DetailProprieteComponent } from './list/detail-propriete.component';
import { DetailProprieteDetailComponent } from './detail/detail-propriete-detail.component';
import { DetailProprieteUpdateComponent } from './update/detail-propriete-update.component';
import { DetailProprieteDeleteDialogComponent } from './delete/detail-propriete-delete-dialog.component';
import { DetailProprieteRoutingModule } from './route/detail-propriete-routing.module';

@NgModule({
  imports: [SharedModule, DetailProprieteRoutingModule],
  declarations: [
    DetailProprieteComponent,
    DetailProprieteDetailComponent,
    DetailProprieteUpdateComponent,
    DetailProprieteDeleteDialogComponent,
  ],
  entryComponents: [DetailProprieteDeleteDialogComponent],
})
export class DetailProprieteModule {}
