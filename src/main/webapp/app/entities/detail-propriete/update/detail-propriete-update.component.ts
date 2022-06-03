import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDetailPropriete, DetailPropriete } from '../detail-propriete.model';
import { DetailProprieteService } from '../service/detail-propriete.service';

@Component({
  selector: 'jhi-detail-propriete-update',
  templateUrl: './detail-propriete-update.component.html',
})
export class DetailProprieteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(
    protected detailProprieteService: DetailProprieteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detailPropriete }) => {
      this.updateForm(detailPropriete);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detailPropriete = this.createFromForm();
    if (detailPropriete.id !== undefined) {
      this.subscribeToSaveResponse(this.detailProprieteService.update(detailPropriete));
    } else {
      this.subscribeToSaveResponse(this.detailProprieteService.create(detailPropriete));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetailPropriete>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(detailPropriete: IDetailPropriete): void {
    this.editForm.patchValue({
      id: detailPropriete.id,
    });
  }

  protected createFromForm(): IDetailPropriete {
    return {
      ...new DetailPropriete(),
      id: this.editForm.get(['id'])!.value,
    };
  }
}
