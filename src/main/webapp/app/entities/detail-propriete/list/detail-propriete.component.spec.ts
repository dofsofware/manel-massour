import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DetailProprieteService } from '../service/detail-propriete.service';

import { DetailProprieteComponent } from './detail-propriete.component';

describe('DetailPropriete Management Component', () => {
  let comp: DetailProprieteComponent;
  let fixture: ComponentFixture<DetailProprieteComponent>;
  let service: DetailProprieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DetailProprieteComponent],
    })
      .overrideTemplate(DetailProprieteComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DetailProprieteComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DetailProprieteService);

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
    expect(comp.detailProprietes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
