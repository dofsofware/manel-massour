import { AfterViewInit, Component } from '@angular/core';
import initJs from 'content/assets/js/index.bundle';
@Component({
  selector: 'jhi-detail-propriete',
  templateUrl: './detail-propriete.component.html',
})
export class DetailProprieteComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initJs();
  }
}
