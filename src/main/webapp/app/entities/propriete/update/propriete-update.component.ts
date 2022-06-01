import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPropriete, Propriete } from '../propriete.model';
import { ProprieteService } from '../service/propriete.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { TypeDeBien } from 'app/entities/enumerations/type-de-bien.model';
import { Transaction } from 'app/entities/enumerations/transaction.model';
import { Etat } from 'app/entities/enumerations/etat.model';
import { ModeDePaiement } from 'app/entities/enumerations/mode-de-paiement.model';
import { Papier } from 'app/entities/enumerations/papier.model';
import { PeriodeDePaiement } from 'app/entities/enumerations/periode-de-paiement.model';

@Component({
  selector: 'jhi-propriete-update',
  templateUrl: './propriete-update.component.html',
})
export class ProprieteUpdateComponent implements OnInit {
  isSaving = false;
  typeDeBienValues = Object.keys(TypeDeBien);
  transactionValues = Object.keys(Transaction);
  etatValues = Object.keys(Etat);
  modeDePaiementValues = Object.keys(ModeDePaiement);
  papierValues = Object.keys(Papier);
  periodeDePaiementValues = Object.keys(PeriodeDePaiement);

  editForm = this.fb.group({
    id: [],
    reference: [null, []],
    type: [],
    modeDeTransaction: [],
    etat: [],
    description: [],
    prix: [],
    adresse: [],
    adresseTronque: [null, [Validators.maxLength(80)]],
    latitude: [],
    longitude: [],
    superficie: [],
    anneeDeConstruction: [null, [Validators.min(1900)]],
    nombreDePieces: [],
    nombreDeDouches: [],
    nombreDeGarages: [],
    modeDePaiement: [],
    papier: [],
    acceEelectricite: [],
    accesEau: [],
    accesADSL: [],
    meuble: [],
    enPromo: [],
    periode: [],
    distancePrimaire: [],
    distanceSecondaire: [],
    distanceLycee: [],
    distancehopital: [],
    distanceclinique: [],
    urlPhotoPrincipale: [],
    urlPhoto1: [],
    urlPhoto2: [],
    urlPhoto3: [],
    urlPhoto4: [],
    urlPhoto5: [],
    urlPhoto6: [],
    urlVideo: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected proprieteService: ProprieteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ propriete }) => {
      this.updateForm(propriete);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('buntuApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const propriete = this.createFromForm();
    if (propriete.id !== undefined) {
      this.subscribeToSaveResponse(this.proprieteService.update(propriete));
    } else {
      this.subscribeToSaveResponse(this.proprieteService.create(propriete));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPropriete>>): void {
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

  protected updateForm(propriete: IPropriete): void {
    this.editForm.patchValue({
      id: propriete.id,
      reference: propriete.reference,
      type: propriete.type,
      modeDeTransaction: propriete.modeDeTransaction,
      etat: propriete.etat,
      description: propriete.description,
      prix: propriete.prix,
      adresse: propriete.adresse,
      adresseTronque: propriete.adresseTronque,
      latitude: propriete.latitude,
      longitude: propriete.longitude,
      superficie: propriete.superficie,
      anneeDeConstruction: propriete.anneeDeConstruction,
      nombreDePieces: propriete.nombreDePieces,
      nombreDeDouches: propriete.nombreDeDouches,
      nombreDeGarages: propriete.nombreDeGarages,
      modeDePaiement: propriete.modeDePaiement,
      papier: propriete.papier,
      acceEelectricite: propriete.acceEelectricite,
      accesEau: propriete.accesEau,
      accesADSL: propriete.accesADSL,
      meuble: propriete.meuble,
      enPromo: propriete.enPromo,
      periode: propriete.periode,
      distancePrimaire: propriete.distancePrimaire,
      distanceSecondaire: propriete.distanceSecondaire,
      distanceLycee: propriete.distanceLycee,
      distancehopital: propriete.distancehopital,
      distanceclinique: propriete.distanceclinique,
      urlPhotoPrincipale: propriete.urlPhotoPrincipale,
      urlPhoto1: propriete.urlPhoto1,
      urlPhoto2: propriete.urlPhoto2,
      urlPhoto3: propriete.urlPhoto3,
      urlPhoto4: propriete.urlPhoto4,
      urlPhoto5: propriete.urlPhoto5,
      urlPhoto6: propriete.urlPhoto6,
      urlVideo: propriete.urlVideo,
    });
  }

  protected createFromForm(): IPropriete {
    return {
      ...new Propriete(),
      id: this.editForm.get(['id'])!.value,
      reference: this.editForm.get(['reference'])!.value,
      type: this.editForm.get(['type'])!.value,
      modeDeTransaction: this.editForm.get(['modeDeTransaction'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      description: this.editForm.get(['description'])!.value,
      prix: this.editForm.get(['prix'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      adresseTronque: this.editForm.get(['adresseTronque'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      superficie: this.editForm.get(['superficie'])!.value,
      anneeDeConstruction: this.editForm.get(['anneeDeConstruction'])!.value,
      nombreDePieces: this.editForm.get(['nombreDePieces'])!.value,
      nombreDeDouches: this.editForm.get(['nombreDeDouches'])!.value,
      nombreDeGarages: this.editForm.get(['nombreDeGarages'])!.value,
      modeDePaiement: this.editForm.get(['modeDePaiement'])!.value,
      papier: this.editForm.get(['papier'])!.value,
      acceEelectricite: this.editForm.get(['acceEelectricite'])!.value,
      accesEau: this.editForm.get(['accesEau'])!.value,
      accesADSL: this.editForm.get(['accesADSL'])!.value,
      meuble: this.editForm.get(['meuble'])!.value,
      enPromo: this.editForm.get(['enPromo'])!.value,
      periode: this.editForm.get(['periode'])!.value,
      distancePrimaire: this.editForm.get(['distancePrimaire'])!.value,
      distanceSecondaire: this.editForm.get(['distanceSecondaire'])!.value,
      distanceLycee: this.editForm.get(['distanceLycee'])!.value,
      distancehopital: this.editForm.get(['distancehopital'])!.value,
      distanceclinique: this.editForm.get(['distanceclinique'])!.value,
      urlPhotoPrincipale: this.editForm.get(['urlPhotoPrincipale'])!.value,
      urlPhoto1: this.editForm.get(['urlPhoto1'])!.value,
      urlPhoto2: this.editForm.get(['urlPhoto2'])!.value,
      urlPhoto3: this.editForm.get(['urlPhoto3'])!.value,
      urlPhoto4: this.editForm.get(['urlPhoto4'])!.value,
      urlPhoto5: this.editForm.get(['urlPhoto5'])!.value,
      urlPhoto6: this.editForm.get(['urlPhoto6'])!.value,
      urlVideo: this.editForm.get(['urlVideo'])!.value,
    };
  }
}
