import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AproposService } from '../service/apropos.service';

import { AproposComponent } from './apropos.component';

describe('Apropos Management Component', () => {
  let comp: AproposComponent;
  let fixture: ComponentFixture<AproposComponent>;
  let service: AproposService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AproposComponent],
    })
      .overrideTemplate(AproposComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AproposComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AproposService);

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
    expect(comp.apropos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
