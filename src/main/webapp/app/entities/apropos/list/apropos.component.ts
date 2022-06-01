import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IApropos } from '../apropos.model';
import { AproposService } from '../service/apropos.service';
import { AproposDeleteDialogComponent } from '../delete/apropos-delete-dialog.component';

@Component({
  selector: 'jhi-apropos',
  templateUrl: './apropos.component.html',
})
export class AproposComponent implements OnInit {
  apropos?: IApropos[];
  isLoading = false;

  constructor(protected aproposService: AproposService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.aproposService.query().subscribe({
      next: (res: HttpResponse<IApropos[]>) => {
        this.isLoading = false;
        this.apropos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IApropos): number {
    return item.id!;
  }

  delete(apropos: IApropos): void {
    const modalRef = this.modalService.open(AproposDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.apropos = apropos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
