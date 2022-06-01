import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApropos } from '../apropos.model';

@Component({
  selector: 'jhi-apropos-detail',
  templateUrl: './apropos-detail.component.html',
})
export class AproposDetailComponent implements OnInit {
  apropos: IApropos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ apropos }) => {
      this.apropos = apropos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
