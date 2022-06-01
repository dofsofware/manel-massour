export interface IContact {
  id?: number;
}

export class Contact implements IContact {
  constructor(public id?: number) {}
}

export function getContactIdentifier(contact: IContact): number | undefined {
  return contact.id;
}
