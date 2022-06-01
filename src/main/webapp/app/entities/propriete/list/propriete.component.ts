import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPropriete } from '../propriete.model';
import { ProprieteService } from '../service/propriete.service';
import { ProprieteDeleteDialogComponent } from '../delete/propriete-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-propriete',
  templateUrl: './propriete.component.html',
})
export class ProprieteComponent implements OnInit {
  proprietes?: IPropriete[];
  isLoading = false;

  constructor(protected proprieteService: ProprieteService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.proprieteService.query().subscribe({
      next: (res: HttpResponse<IPropriete[]>) => {
        this.isLoading = false;
        this.proprietes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPropriete): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(propriete: IPropriete): void {
    const modalRef = this.modalService.open(ProprieteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.propriete = propriete;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
