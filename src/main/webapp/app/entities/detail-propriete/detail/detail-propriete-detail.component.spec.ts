import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetailProprieteDetailComponent } from './detail-propriete-detail.component';

describe('DetailPropriete Management Detail Component', () => {
  let comp: DetailProprieteDetailComponent;
  let fixture: ComponentFixture<DetailProprieteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailProprieteDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ detailPropriete: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DetailProprieteDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DetailProprieteDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load detailPropriete on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.detailPropriete).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
