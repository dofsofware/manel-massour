import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'recherche',
        data: { pageTitle: 'buntuApp.recherche.home.title' },
        loadChildren: () => import('./recherche/recherche.module').then(m => m.RechercheModule),
      },
      {
        path: 'contact',
        data: { pageTitle: 'buntuApp.contact.home.title' },
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
      },
      {
        path: 'apropos',
        data: { pageTitle: 'buntuApp.apropos.home.title' },
        loadChildren: () => import('./apropos/apropos.module').then(m => m.AproposModule),
      },
      {
        path: 'propriete',
        data: { pageTitle: 'buntuApp.propriete.home.title' },
        loadChildren: () => import('./propriete/propriete.module').then(m => m.ProprieteModule),
      },
      {
        path: 'detail-propriete',
        data: { pageTitle: 'buntuApp.detailPropriete.home.title' },
        loadChildren: () => import('./detail-propriete/detail-propriete.module').then(m => m.DetailProprieteModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
