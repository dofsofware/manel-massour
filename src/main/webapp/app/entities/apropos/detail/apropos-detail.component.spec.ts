import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AproposDetailComponent } from './apropos-detail.component';

describe('Apropos Management Detail Component', () => {
  let comp: AproposDetailComponent;
  let fixture: ComponentFixture<AproposDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AproposDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ apropos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AproposDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AproposDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load apropos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.apropos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
