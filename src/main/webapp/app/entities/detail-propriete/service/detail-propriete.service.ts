import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDetailPropriete, getDetailProprieteIdentifier } from '../detail-propriete.model';

export type EntityResponseType = HttpResponse<IDetailPropriete>;
export type EntityArrayResponseType = HttpResponse<IDetailPropriete[]>;

@Injectable({ providedIn: 'root' })
export class DetailProprieteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/detail-proprietes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(detailPropriete: IDetailPropriete): Observable<EntityResponseType> {
    return this.http.post<IDetailPropriete>(this.resourceUrl, detailPropriete, { observe: 'response' });
  }

  update(detailPropriete: IDetailPropriete): Observable<EntityResponseType> {
    return this.http.put<IDetailPropriete>(
      `${this.resourceUrl}/${getDetailProprieteIdentifier(detailPropriete) as number}`,
      detailPropriete,
      { observe: 'response' }
    );
  }

  partialUpdate(detailPropriete: IDetailPropriete): Observable<EntityResponseType> {
    return this.http.patch<IDetailPropriete>(
      `${this.resourceUrl}/${getDetailProprieteIdentifier(detailPropriete) as number}`,
      detailPropriete,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetailPropriete>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetailPropriete[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDetailProprieteToCollectionIfMissing(
    detailProprieteCollection: IDetailPropriete[],
    ...detailProprietesToCheck: (IDetailPropriete | null | undefined)[]
  ): IDetailPropriete[] {
    const detailProprietes: IDetailPropriete[] = detailProprietesToCheck.filter(isPresent);
    if (detailProprietes.length > 0) {
      const detailProprieteCollectionIdentifiers = detailProprieteCollection.map(
        detailProprieteItem => getDetailProprieteIdentifier(detailProprieteItem)!
      );
      const detailProprietesToAdd = detailProprietes.filter(detailProprieteItem => {
        const detailProprieteIdentifier = getDetailProprieteIdentifier(detailProprieteItem);
        if (detailProprieteIdentifier == null || detailProprieteCollectionIdentifiers.includes(detailProprieteIdentifier)) {
          return false;
        }
        detailProprieteCollectionIdentifiers.push(detailProprieteIdentifier);
        return true;
      });
      return [...detailProprietesToAdd, ...detailProprieteCollection];
    }
    return detailProprieteCollection;
  }
}
