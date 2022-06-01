import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AproposService } from '../service/apropos.service';
import { IApropos, Apropos } from '../apropos.model';

import { AproposUpdateComponent } from './apropos-update.component';

describe('Apropos Management Update Component', () => {
  let comp: AproposUpdateComponent;
  let fixture: ComponentFixture<AproposUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let aproposService: AproposService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AproposUpdateComponent],
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
      .overrideTemplate(AproposUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AproposUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    aproposService = TestBed.inject(AproposService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const apropos: IApropos = { id: 456 };

      activatedRoute.data = of({ apropos });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(apropos));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Apropos>>();
      const apropos = { id: 123 };
      jest.spyOn(aproposService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apropos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: apropos }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(aproposService.update).toHaveBeenCalledWith(apropos);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Apropos>>();
      const apropos = new Apropos();
      jest.spyOn(aproposService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apropos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: apropos }));
      saveSubject.complete();

      // THEN
      expect(aproposService.create).toHaveBeenCalledWith(apropos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Apropos>>();
      const apropos = { id: 123 };
      jest.spyOn(aproposService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apropos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(aproposService.update).toHaveBeenCalledWith(apropos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
