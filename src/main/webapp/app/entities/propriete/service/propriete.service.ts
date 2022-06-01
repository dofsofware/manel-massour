import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPropriete, getProprieteIdentifier } from '../propriete.model';

export type EntityResponseType = HttpResponse<IPropriete>;
export type EntityArrayResponseType = HttpResponse<IPropriete[]>;

@Injectable({ providedIn: 'root' })
export class ProprieteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/proprietes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(propriete: IPropriete): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(propriete);
    return this.http
      .post<IPropriete>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(propriete: IPropriete): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(propriete);
    return this.http
      .put<IPropriete>(`${this.resourceUrl}/${getProprieteIdentifier(propriete) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(propriete: IPropriete): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(propriete);
    return this.http
      .patch<IPropriete>(`${this.resourceUrl}/${getProprieteIdentifier(propriete) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPropriete>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPropriete[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProprieteToCollectionIfMissing(
    proprieteCollection: IPropriete[],
    ...proprietesToCheck: (IPropriete | null | undefined)[]
  ): IPropriete[] {
    const proprietes: IPropriete[] = proprietesToCheck.filter(isPresent);
    if (proprietes.length > 0) {
      const proprieteCollectionIdentifiers = proprieteCollection.map(proprieteItem => getProprieteIdentifier(proprieteItem)!);
      const proprietesToAdd = proprietes.filter(proprieteItem => {
        const proprieteIdentifier = getProprieteIdentifier(proprieteItem);
        if (proprieteIdentifier == null || proprieteCollectionIdentifiers.includes(proprieteIdentifier)) {
          return false;
        }
        proprieteCollectionIdentifiers.push(proprieteIdentifier);
        return true;
      });
      return [...proprietesToAdd, ...proprieteCollection];
    }
    return proprieteCollection;
  }

  protected convertDateFromClient(propriete: IPropriete): IPropriete {
    return Object.assign({}, propriete, {
      enPromo: propriete.enPromo?.isValid() ? propriete.enPromo.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.enPromo = res.body.enPromo ? dayjs(res.body.enPromo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((propriete: IPropriete) => {
        propriete.enPromo = propriete.enPromo ? dayjs(propriete.enPromo) : undefined;
      });
    }
    return res;
  }
}
