import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecherche } from '../recherche.model';
import { RechercheService } from '../service/recherche.service';

@Component({
  templateUrl: './recherche-delete-dialog.component.html',
})
export class RechercheDeleteDialogComponent {
  recherche?: IRecherche;

  constructor(protected rechercheService: RechercheService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rechercheService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
