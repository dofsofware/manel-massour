import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AproposComponent } from './list/apropos.component';
import { AproposDetailComponent } from './detail/apropos-detail.component';
import { AproposUpdateComponent } from './update/apropos-update.component';
import { AproposDeleteDialogComponent } from './delete/apropos-delete-dialog.component';
import { AproposRoutingModule } from './route/apropos-routing.module';

@NgModule({
  imports: [SharedModule, AproposRoutingModule],
  declarations: [AproposComponent, AproposDetailComponent, AproposUpdateComponent, AproposDeleteDialogComponent],
  entryComponents: [AproposDeleteDialogComponent],
})
export class AproposModule {}
