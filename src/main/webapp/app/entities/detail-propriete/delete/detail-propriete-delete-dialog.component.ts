import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetailPropriete } from '../detail-propriete.model';
import { DetailProprieteService } from '../service/detail-propriete.service';

@Component({
  templateUrl: './detail-propriete-delete-dialog.component.html',
})
export class DetailProprieteDeleteDialogComponent {
  detailPropriete?: IDetailPropriete;

  constructor(protected detailProprieteService: DetailProprieteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detailProprieteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
