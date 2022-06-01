export interface IRecherche {
  id?: number;
}

export class Recherche implements IRecherche {
  constructor(public id?: number) {}
}

export function getRechercheIdentifier(recherche: IRecherche): number | undefined {
  return recherche.id;
}
