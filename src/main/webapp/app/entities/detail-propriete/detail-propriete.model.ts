export interface IDetailPropriete {
  id?: number;
}

export class DetailPropriete implements IDetailPropriete {
  constructor(public id?: number) {}
}

export function getDetailProprieteIdentifier(detailPropriete: IDetailPropriete): number | undefined {
  return detailPropriete.id;
}
