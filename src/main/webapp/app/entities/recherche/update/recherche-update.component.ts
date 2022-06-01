import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRecherche, Recherche } from '../recherche.model';
import { RechercheService } from '../service/recherche.service';

@Component({
  selector: 'jhi-recherche-update',
  templateUrl: './recherche-update.component.html',
})
export class RechercheUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected rechercheService: RechercheService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recherche }) => {
      this.updateForm(recherche);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recherche = this.createFromForm();
    if (recherche.id !== undefined) {
      this.subscribeToSaveResponse(this.rechercheService.update(recherche));
    } else {
      this.subscribeToSaveResponse(this.rechercheService.create(recherche));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecherche>>): void {
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

  protected updateForm(recherche: IRecherche): void {
    this.editForm.patchValue({
      id: recherche.id,
    });
  }

  protected createFromForm(): IRecherche {
    return {
      ...new Recherche(),
      id: this.editForm.get(['id'])!.value,
    };
  }
}
