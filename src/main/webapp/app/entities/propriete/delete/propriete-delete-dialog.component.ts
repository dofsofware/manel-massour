import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPropriete } from '../propriete.model';
import { ProprieteService } from '../service/propriete.service';

@Component({
  templateUrl: './propriete-delete-dialog.component.html',
})
export class ProprieteDeleteDialogComponent {
  propriete?: IPropriete;

  constructor(protected proprieteService: ProprieteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.proprieteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
