import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecherche } from '../recherche.model';

@Component({
  selector: 'jhi-recherche-detail',
  templateUrl: './recherche-detail.component.html',
})
export class RechercheDetailComponent implements OnInit {
  recherche: IRecherche | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recherche }) => {
      this.recherche = recherche;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
