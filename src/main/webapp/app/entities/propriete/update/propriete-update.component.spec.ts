import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProprieteService } from '../service/propriete.service';
import { IPropriete, Propriete } from '../propriete.model';

import { ProprieteUpdateComponent } from './propriete-update.component';

describe('Propriete Management Update Component', () => {
  let comp: ProprieteUpdateComponent;
  let fixture: ComponentFixture<ProprieteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let proprieteService: ProprieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProprieteUpdateComponent],
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
      .overrideTemplate(ProprieteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProprieteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    proprieteService = TestBed.inject(ProprieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const propriete: IPropriete = { id: 456 };

      activatedRoute.data = of({ propriete });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(propriete));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Propriete>>();
      const propriete = { id: 123 };
      jest.spyOn(proprieteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ propriete });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: propriete }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(proprieteService.update).toHaveBeenCalledWith(propriete);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Propriete>>();
      const propriete = new Propriete();
      jest.spyOn(proprieteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ propriete });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: propriete }));
      saveSubject.complete();

      // THEN
      expect(proprieteService.create).toHaveBeenCalledWith(propriete);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Propriete>>();
      const propriete = { id: 123 };
      jest.spyOn(proprieteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ propriete });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(proprieteService.update).toHaveBeenCalledWith(propriete);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
