import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRecherche, getRechercheIdentifier } from '../recherche.model';

export type EntityResponseType = HttpResponse<IRecherche>;
export type EntityArrayResponseType = HttpResponse<IRecherche[]>;

@Injectable({ providedIn: 'root' })
export class RechercheService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/recherches');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(recherche: IRecherche): Observable<EntityResponseType> {
    return this.http.post<IRecherche>(this.resourceUrl, recherche, { observe: 'response' });
  }

  update(recherche: IRecherche): Observable<EntityResponseType> {
    return this.http.put<IRecherche>(`${this.resourceUrl}/${getRechercheIdentifier(recherche) as number}`, recherche, {
      observe: 'response',
    });
  }

  partialUpdate(recherche: IRecherche): Observable<EntityResponseType> {
    return this.http.patch<IRecherche>(`${this.resourceUrl}/${getRechercheIdentifier(recherche) as number}`, recherche, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRecherche>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecherche[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRechercheToCollectionIfMissing(
    rechercheCollection: IRecherche[],
    ...recherchesToCheck: (IRecherche | null | undefined)[]
  ): IRecherche[] {
    const recherches: IRecherche[] = recherchesToCheck.filter(isPresent);
    if (recherches.length > 0) {
      const rechercheCollectionIdentifiers = rechercheCollection.map(rechercheItem => getRechercheIdentifier(rechercheItem)!);
      const recherchesToAdd = recherches.filter(rechercheItem => {
        const rechercheIdentifier = getRechercheIdentifier(rechercheItem);
        if (rechercheIdentifier == null || rechercheCollectionIdentifiers.includes(rechercheIdentifier)) {
          return false;
        }
        rechercheCollectionIdentifiers.push(rechercheIdentifier);
        return true;
      });
      return [...recherchesToAdd, ...rechercheCollection];
    }
    return rechercheCollection;
  }
}
