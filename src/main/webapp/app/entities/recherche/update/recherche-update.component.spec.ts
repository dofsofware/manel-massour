import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RechercheService } from '../service/recherche.service';
import { IRecherche, Recherche } from '../recherche.model';

import { RechercheUpdateComponent } from './recherche-update.component';

describe('Recherche Management Update Component', () => {
  let comp: RechercheUpdateComponent;
  let fixture: ComponentFixture<RechercheUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rechercheService: RechercheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RechercheUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(RechercheUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RechercheUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rechercheService = TestBed.inject(RechercheService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const recherche: IRecherche = { id: 456 };

      activatedRoute.data = of({ recherche });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(recherche));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Recherche>>();
      const recherche = { id: 123 };
      jest.spyOn(rechercheService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recherche });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: recherche }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rechercheService.update).toHaveBeenCalledWith(recherche);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Recherche>>();
      const recherche = new Recherche();
      jest.spyOn(rechercheService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recherche });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: recherche }));
      saveSubject.complete();

      // THEN
      expect(rechercheService.create).toHaveBeenCalledWith(recherche);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Recherche>>();
      const recherche = { id: 123 };
      jest.spyOn(rechercheService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recherche });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rechercheService.update).toHaveBeenCalledWith(recherche);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
