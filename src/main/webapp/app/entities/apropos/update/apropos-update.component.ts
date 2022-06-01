import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IApropos, Apropos } from '../apropos.model';
import { AproposService } from '../service/apropos.service';

@Component({
  selector: 'jhi-apropos-update',
  templateUrl: './apropos-update.component.html',
})
export class AproposUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected aproposService: AproposService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ apropos }) => {
      this.updateForm(apropos);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const apropos = this.createFromForm();
    if (apropos.id !== undefined) {
      this.subscribeToSaveResponse(this.aproposService.update(apropos));
    } else {
      this.subscribeToSaveResponse(this.aproposService.create(apropos));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApropos>>): void {
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

  protected updateForm(apropos: IApropos): void {
    this.editForm.patchValue({
      id: apropos.id,
    });
  }

  protected createFromForm(): IApropos {
    return {
      ...new Apropos(),
      id: this.editForm.get(['id'])!.value,
    };
  }
}
