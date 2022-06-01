export interface IApropos {
  id?: number;
}

export class Apropos implements IApropos {
  constructor(public id?: number) {}
}

export function getAproposIdentifier(apropos: IApropos): number | undefined {
  return apropos.id;
}
