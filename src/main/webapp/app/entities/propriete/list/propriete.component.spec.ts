import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProprieteService } from '../service/propriete.service';

import { ProprieteComponent } from './propriete.component';

describe('Propriete Management Component', () => {
  let comp: ProprieteComponent;
  let fixture: ComponentFixture<ProprieteComponent>;
  let service: ProprieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProprieteComponent],
    })
      .overrideTemplate(ProprieteComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProprieteComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProprieteService);

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
    expect(comp.proprietes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
