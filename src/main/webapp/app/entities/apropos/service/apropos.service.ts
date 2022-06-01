import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApropos, getAproposIdentifier } from '../apropos.model';

export type EntityResponseType = HttpResponse<IApropos>;
export type EntityArrayResponseType = HttpResponse<IApropos[]>;

@Injectable({ providedIn: 'root' })
export class AproposService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/apropos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apropos: IApropos): Observable<EntityResponseType> {
    return this.http.post<IApropos>(this.resourceUrl, apropos, { observe: 'response' });
  }

  update(apropos: IApropos): Observable<EntityResponseType> {
    return this.http.put<IApropos>(`${this.resourceUrl}/${getAproposIdentifier(apropos) as number}`, apropos, { observe: 'response' });
  }

  partialUpdate(apropos: IApropos): Observable<EntityResponseType> {
    return this.http.patch<IApropos>(`${this.resourceUrl}/${getAproposIdentifier(apropos) as number}`, apropos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApropos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApropos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAproposToCollectionIfMissing(aproposCollection: IApropos[], ...aproposToCheck: (IApropos | null | undefined)[]): IApropos[] {
    const apropos: IApropos[] = aproposToCheck.filter(isPresent);
    if (apropos.length > 0) {
      const aproposCollectionIdentifiers = aproposCollection.map(aproposItem => getAproposIdentifier(aproposItem)!);
      const aproposToAdd = apropos.filter(aproposItem => {
        const aproposIdentifier = getAproposIdentifier(aproposItem);
        if (aproposIdentifier == null || aproposCollectionIdentifiers.includes(aproposIdentifier)) {
          return false;
        }
        aproposCollectionIdentifiers.push(aproposIdentifier);
        return true;
      });
      return [...aproposToAdd, ...aproposCollection];
    }
    return aproposCollection;
  }
}
