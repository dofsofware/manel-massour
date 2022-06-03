import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RechercheService } from '../service/recherche.service';

import { RechercheComponent } from './recherche.component';

describe('Recherche Management Component', () => {
  let comp: RechercheComponent;
  let fixture: ComponentFixture<RechercheComponent>;
  let service: RechercheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RechercheComponent],
    })
      .overrideTemplate(RechercheComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RechercheComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RechercheService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.recherches?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
