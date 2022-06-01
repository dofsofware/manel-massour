import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IApropos, Apropos } from '../apropos.model';

import { AproposService } from './apropos.service';

describe('Apropos Service', () => {
  let service: AproposService;
  let httpMock: HttpTestingController;
  let elemDefault: IApropos;
  let expectedResult: IApropos | IApropos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AproposService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Apropos', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Apropos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Apropos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Apropos', () => {
      const patchObject = Object.assign({}, new Apropos());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Apropos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Apropos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAproposToCollectionIfMissing', () => {
      it('should add a Apropos to an empty array', () => {
        const apropos: IApropos = { id: 123 };
        expectedResult = service.addAproposToCollectionIfMissing([], apropos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(apropos);
      });

      it('should not add a Apropos to an array that contains it', () => {
        const apropos: IApropos = { id: 123 };
        const aproposCollection: IApropos[] = [
          {
            ...apropos,
          },
          { id: 456 },
        ];
        expectedResult = service.addAproposToCollectionIfMissing(aproposCollection, apropos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Apropos to an array that doesn't contain it", () => {
        const apropos: IApropos = { id: 123 };
        const aproposCollection: IApropos[] = [{ id: 456 }];
        expectedResult = service.addAproposToCollectionIfMissing(aproposCollection, apropos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(apropos);
      });

      it('should add only unique Apropos to an array', () => {
        const aproposArray: IApropos[] = [{ id: 123 }, { id: 456 }, { id: 69278 }];
        const aproposCollection: IApropos[] = [{ id: 123 }];
        expectedResult = service.addAproposToCollectionIfMissing(aproposCollection, ...aproposArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const apropos: IApropos = { id: 123 };
        const apropos2: IApropos = { id: 456 };
        expectedResult = service.addAproposToCollectionIfMissing([], apropos, apropos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(apropos);
        expect(expectedResult).toContain(apropos2);
      });

      it('should accept null and undefined values', () => {
        const apropos: IApropos = { id: 123 };
        expectedResult = service.addAproposToCollectionIfMissing([], null, apropos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(apropos);
      });

      it('should return initial array if no Apropos is added', () => {
        const aproposCollection: IApropos[] = [{ id: 123 }];
        expectedResult = service.addAproposToCollectionIfMissing(aproposCollection, undefined, null);
        expect(expectedResult).toEqual(aproposCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
