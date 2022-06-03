import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DetailProprieteService } from '../service/detail-propriete.service';
import { IDetailPropriete, DetailPropriete } from '../detail-propriete.model';

import { DetailProprieteUpdateComponent } from './detail-propriete-update.component';

describe('DetailPropriete Management Update Component', () => {
  let comp: DetailProprieteUpdateComponent;
  let fixture: ComponentFixture<DetailProprieteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let detailProprieteService: DetailProprieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DetailProprieteUpdateComponent],
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
      .overrideTemplate(DetailProprieteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DetailProprieteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    detailProprieteService = TestBed.inject(DetailProprieteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const detailPropriete: IDetailPropriete = { id: 456 };

      activatedRoute.data = of({ detailPropriete });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(detailPropriete));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DetailPropriete>>();
      const detailPropriete = { id: 123 };
      jest.spyOn(detailProprieteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detailPropriete });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: detailPropriete }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(detailProprieteService.update).toHaveBeenCalledWith(detailPropriete);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DetailPropriete>>();
      const detailPropriete = new DetailPropriete();
      jest.spyOn(detailProprieteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detailPropriete });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: detailPropriete }));
      saveSubject.complete();

      // THEN
      expect(detailProprieteService.create).toHaveBeenCalledWith(detailPropriete);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DetailPropriete>>();
      const detailPropriete = { id: 123 };
      jest.spyOn(detailProprieteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detailPropriete });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(detailProprieteService.update).toHaveBeenCalledWith(detailPropriete);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
