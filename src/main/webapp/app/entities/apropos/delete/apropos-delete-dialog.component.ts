import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IApropos } from '../apropos.model';
import { AproposService } from '../service/apropos.service';

@Component({
  templateUrl: './apropos-delete-dialog.component.html',
})
export class AproposDeleteDialogComponent {
  apropos?: IApropos;

  constructor(protected aproposService: AproposService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aproposService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
