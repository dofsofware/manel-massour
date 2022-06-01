import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRecherche, Recherche } from '../recherche.model';

import { RechercheService } from './recherche.service';

describe('Recherche Service', () => {
  let service: RechercheService;
  let httpMock: HttpTestingController;
  let elemDefault: IRecherche;
  let expectedResult: IRecherche | IRecherche[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RechercheService);
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

    it('should create a Recherche', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Recherche()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Recherche', () => {
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

    it('should partial update a Recherche', () => {
      const patchObject = Object.assign({}, new Recherche());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Recherche', () => {
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

    it('should delete a Recherche', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRechercheToCollectionIfMissing', () => {
      it('should add a Recherche to an empty array', () => {
        const recherche: IRecherche = { id: 123 };
        expectedResult = service.addRechercheToCollectionIfMissing([], recherche);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(recherche);
      });

      it('should not add a Recherche to an array that contains it', () => {
        const recherche: IRecherche = { id: 123 };
        const rechercheCollection: IRecherche[] = [
          {
            ...recherche,
          },
          { id: 456 },
        ];
        expectedResult = service.addRechercheToCollectionIfMissing(rechercheCollection, recherche);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Recherche to an array that doesn't contain it", () => {
        const recherche: IRecherche = { id: 123 };
        const rechercheCollection: IRecherche[] = [{ id: 456 }];
        expectedResult = service.addRechercheToCollectionIfMissing(rechercheCollection, recherche);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(recherche);
      });

      it('should add only unique Recherche to an array', () => {
        const rechercheArray: IRecherche[] = [{ id: 123 }, { id: 456 }, { id: 57600 }];
        const rechercheCollection: IRecherche[] = [{ id: 123 }];
        expectedResult = service.addRechercheToCollectionIfMissing(rechercheCollection, ...rechercheArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const recherche: IRecherche = { id: 123 };
        const recherche2: IRecherche = { id: 456 };
        expectedResult = service.addRechercheToCollectionIfMissing([], recherche, recherche2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(recherche);
        expect(expectedResult).toContain(recherche2);
      });

      it('should accept null and undefined values', () => {
        const recherche: IRecherche = { id: 123 };
        expectedResult = service.addRechercheToCollectionIfMissing([], null, recherche, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(recherche);
      });

      it('should return initial array if no Recherche is added', () => {
        const rechercheCollection: IRecherche[] = [{ id: 123 }];
        expectedResult = service.addRechercheToCollectionIfMissing(rechercheCollection, undefined, null);
        expect(expectedResult).toEqual(rechercheCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
