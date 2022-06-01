import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { TypeDeBien } from 'app/entities/enumerations/type-de-bien.model';
import { Transaction } from 'app/entities/enumerations/transaction.model';
import { Etat } from 'app/entities/enumerations/etat.model';
import { ModeDePaiement } from 'app/entities/enumerations/mode-de-paiement.model';
import { Papier } from 'app/entities/enumerations/papier.model';
import { PeriodeDePaiement } from 'app/entities/enumerations/periode-de-paiement.model';
import { IPropriete, Propriete } from '../propriete.model';

import { ProprieteService } from './propriete.service';

describe('Propriete Service', () => {
  let service: ProprieteService;
  let httpMock: HttpTestingController;
  let elemDefault: IPropriete;
  let expectedResult: IPropriete | IPropriete[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProprieteService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      reference: 'AAAAAAA',
      type: TypeDeBien.TERRAIN,
      modeDeTransaction: Transaction.VENDRE,
      etat: Etat.NEUF,
      description: 'AAAAAAA',
      prix: 0,
      adresse: 'AAAAAAA',
      adresseTronque: 'AAAAAAA',
      latitude: 0,
      longitude: 0,
      superficie: 0,
      anneeDeConstruction: 0,
      nombreDePieces: 0,
      nombreDeDouches: 0,
      nombreDeGarages: 0,
      modeDePaiement: ModeDePaiement.COMPTANT,
      papier: Papier.TITRE_FONCIER,
      acceEelectricite: false,
      accesEau: false,
      accesADSL: false,
      meuble: false,
      enPromo: currentDate,
      periode: PeriodeDePaiement.JOUR,
      distancePrimaire: 0,
      distanceSecondaire: 0,
      distanceLycee: 0,
      distancehopital: 0,
      distanceclinique: 0,
      urlPhotoPrincipale: 'AAAAAAA',
      urlPhoto1: 'AAAAAAA',
      urlPhoto2: 'AAAAAAA',
      urlPhoto3: 'AAAAAAA',
      urlPhoto4: 'AAAAAAA',
      urlPhoto5: 'AAAAAAA',
      urlPhoto6: 'AAAAAAA',
      urlVideo: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          enPromo: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Propriete', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          enPromo: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          enPromo: currentDate,
        },
        returnedFromService
      );

      service.create(new Propriete()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Propriete', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          reference: 'BBBBBB',
          type: 'BBBBBB',
          modeDeTransaction: 'BBBBBB',
          etat: 'BBBBBB',
          description: 'BBBBBB',
          prix: 1,
          adresse: 'BBBBBB',
          adresseTronque: 'BBBBBB',
          latitude: 1,
          longitude: 1,
          superficie: 1,
          anneeDeConstruction: 1,
          nombreDePieces: 1,
          nombreDeDouches: 1,
          nombreDeGarages: 1,
          modeDePaiement: 'BBBBBB',
          papier: 'BBBBBB',
          acceEelectricite: true,
          accesEau: true,
          accesADSL: true,
          meuble: true,
          enPromo: currentDate.format(DATE_FORMAT),
          periode: 'BBBBBB',
          distancePrimaire: 1,
          distanceSecondaire: 1,
          distanceLycee: 1,
          distancehopital: 1,
          distanceclinique: 1,
          urlPhotoPrincipale: 'BBBBBB',
          urlPhoto1: 'BBBBBB',
          urlPhoto2: 'BBBBBB',
          urlPhoto3: 'BBBBBB',
          urlPhoto4: 'BBBBBB',
          urlPhoto5: 'BBBBBB',
          urlPhoto6: 'BBBBBB',
          urlVideo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          enPromo: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Propriete', () => {
      const patchObject = Object.assign(
        {
          modeDeTransaction: 'BBBBBB',
          etat: 'BBBBBB',
          adresse: 'BBBBBB',
          adresseTronque: 'BBBBBB',
          superficie: 1,
          anneeDeConstruction: 1,
          nombreDeGarages: 1,
          papier: 'BBBBBB',
          acceEelectricite: true,
          accesADSL: true,
          meuble: true,
          enPromo: currentDate.format(DATE_FORMAT),
          periode: 'BBBBBB',
          distancePrimaire: 1,
          distancehopital: 1,
          urlPhoto1: 'BBBBBB',
          urlPhoto2: 'BBBBBB',
          urlPhoto3: 'BBBBBB',
          urlPhoto4: 'BBBBBB',
          urlPhoto5: 'BBBBBB',
          urlPhoto6: 'BBBBBB',
          urlVideo: 'BBBBBB',
        },
        new Propriete()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          enPromo: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Propriete', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          reference: 'BBBBBB',
          type: 'BBBBBB',
          modeDeTransaction: 'BBBBBB',
          etat: 'BBBBBB',
          description: 'BBBBBB',
          prix: 1,
          adresse: 'BBBBBB',
          adresseTronque: 'BBBBBB',
          latitude: 1,
          longitude: 1,
          superficie: 1,
          anneeDeConstruction: 1,
          nombreDePieces: 1,
          nombreDeDouches: 1,
          nombreDeGarages: 1,
          modeDePaiement: 'BBBBBB',
          papier: 'BBBBBB',
          acceEelectricite: true,
          accesEau: true,
          accesADSL: true,
          meuble: true,
          enPromo: currentDate.format(DATE_FORMAT),
          periode: 'BBBBBB',
          distancePrimaire: 1,
          distanceSecondaire: 1,
          distanceLycee: 1,
          distancehopital: 1,
          distanceclinique: 1,
          urlPhotoPrincipale: 'BBBBBB',
          urlPhoto1: 'BBBBBB',
          urlPhoto2: 'BBBBBB',
          urlPhoto3: 'BBBBBB',
          urlPhoto4: 'BBBBBB',
          urlPhoto5: 'BBBBBB',
          urlPhoto6: 'BBBBBB',
          urlVideo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          enPromo: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Propriete', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProprieteToCollectionIfMissing', () => {
      it('should add a Propriete to an empty array', () => {
        const propriete: IPropriete = { id: 123 };
        expectedResult = service.addProprieteToCollectionIfMissing([], propriete);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(propriete);
      });

      it('should not add a Propriete to an array that contains it', () => {
        const propriete: IPropriete = { id: 123 };
        const proprieteCollection: IPropriete[] = [
          {
            ...propriete,
          },
          { id: 456 },
        ];
        expectedResult = service.addProprieteToCollectionIfMissing(proprieteCollection, propriete);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Propriete to an array that doesn't contain it", () => {
        const propriete: IPropriete = { id: 123 };
        const proprieteCollection: IPropriete[] = [{ id: 456 }];
        expectedResult = service.addProprieteToCollectionIfMissing(proprieteCollection, propriete);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(propriete);
      });

      it('should add only unique Propriete to an array', () => {
        const proprieteArray: IPropriete[] = [{ id: 123 }, { id: 456 }, { id: 96994 }];
        const proprieteCollection: IPropriete[] = [{ id: 123 }];
        expectedResult = service.addProprieteToCollectionIfMissing(proprieteCollection, ...proprieteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const propriete: IPropriete = { id: 123 };
        const propriete2: IPropriete = { id: 456 };
        expectedResult = service.addProprieteToCollectionIfMissing([], propriete, propriete2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(propriete);
        expect(expectedResult).toContain(propriete2);
      });

      it('should accept null and undefined values', () => {
        const propriete: IPropriete = { id: 123 };
        expectedResult = service.addProprieteToCollectionIfMissing([], null, propriete, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(propriete);
      });

      it('should return initial array if no Propriete is added', () => {
        const proprieteCollection: IPropriete[] = [{ id: 123 }];
        expectedResult = service.addProprieteToCollectionIfMissing(proprieteCollection, undefined, null);
        expect(expectedResult).toEqual(proprieteCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
