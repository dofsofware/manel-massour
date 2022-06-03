import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetailPropriete } from '../detail-propriete.model';

@Component({
  selector: 'jhi-detail-propriete-detail',
  templateUrl: './detail-propriete-detail.component.html',
})
export class DetailProprieteDetailComponent implements OnInit {
  detailPropriete: IDetailPropriete | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detailPropriete }) => {
      this.detailPropriete = detailPropriete;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
