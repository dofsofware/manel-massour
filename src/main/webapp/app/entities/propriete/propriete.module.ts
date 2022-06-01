import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProprieteComponent } from './list/propriete.component';
import { ProprieteDetailComponent } from './detail/propriete-detail.component';
import { ProprieteUpdateComponent } from './update/propriete-update.component';
import { ProprieteDeleteDialogComponent } from './delete/propriete-delete-dialog.component';
import { ProprieteRoutingModule } from './route/propriete-routing.module';

@NgModule({
  imports: [SharedModule, ProprieteRoutingModule],
  declarations: [ProprieteComponent, ProprieteDetailComponent, ProprieteUpdateComponent, ProprieteDeleteDialogComponent],
  entryComponents: [ProprieteDeleteDialogComponent],
})
export class ProprieteModule {}
