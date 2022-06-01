import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RechercheDetailComponent } from './recherche-detail.component';

describe('Recherche Management Detail Component', () => {
  let comp: RechercheDetailComponent;
  let fixture: ComponentFixture<RechercheDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechercheDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ recherche: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RechercheDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RechercheDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load recherche on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.recherche).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
