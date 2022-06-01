import dayjs from 'dayjs/esm';
import { TypeDeBien } from 'app/entities/enumerations/type-de-bien.model';
import { Transaction } from 'app/entities/enumerations/transaction.model';
import { Etat } from 'app/entities/enumerations/etat.model';
import { ModeDePaiement } from 'app/entities/enumerations/mode-de-paiement.model';
import { Papier } from 'app/entities/enumerations/papier.model';
import { PeriodeDePaiement } from 'app/entities/enumerations/periode-de-paiement.model';

export interface IPropriete {
  id?: number;
  reference?: string | null;
  type?: TypeDeBien | null;
  modeDeTransaction?: Transaction | null;
  etat?: Etat | null;
  description?: string | null;
  prix?: number | null;
  adresse?: string | null;
  adresseTronque?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  superficie?: number | null;
  anneeDeConstruction?: number | null;
  nombreDePieces?: number | null;
  nombreDeDouches?: number | null;
  nombreDeGarages?: number | null;
  modeDePaiement?: ModeDePaiement | null;
  papier?: Papier | null;
  acceEelectricite?: boolean | null;
  accesEau?: boolean | null;
  accesADSL?: boolean | null;
  meuble?: boolean | null;
  enPromo?: dayjs.Dayjs | null;
  periode?: PeriodeDePaiement | null;
  distancePrimaire?: number | null;
  distanceSecondaire?: number | null;
  distanceLycee?: number | null;
  distancehopital?: number | null;
  distanceclinique?: number | null;
  urlPhotoPrincipale?: string | null;
  urlPhoto1?: string | null;
  urlPhoto2?: string | null;
  urlPhoto3?: string | null;
  urlPhoto4?: string | null;
  urlPhoto5?: string | null;
  urlPhoto6?: string | null;
  urlVideo?: string | null;
}

export class Propriete implements IPropriete {
  constructor(
    public id?: number,
    public reference?: string | null,
    public type?: TypeDeBien | null,
    public modeDeTransaction?: Transaction | null,
    public etat?: Etat | null,
    public description?: string | null,
    public prix?: number | null,
    public adresse?: string | null,
    public adresseTronque?: string | null,
    public latitude?: number | null,
    public longitude?: number | null,
    public superficie?: number | null,
    public anneeDeConstruction?: number | null,
    public nombreDePieces?: number | null,
    public nombreDeDouches?: number | null,
    public nombreDeGarages?: number | null,
    public modeDePaiement?: ModeDePaiement | null,
    public papier?: Papier | null,
    public acceEelectricite?: boolean | null,
    public accesEau?: boolean | null,
    public accesADSL?: boolean | null,
    public meuble?: boolean | null,
    public enPromo?: dayjs.Dayjs | null,
    public periode?: PeriodeDePaiement | null,
    public distancePrimaire?: number | null,
    public distanceSecondaire?: number | null,
    public distanceLycee?: number | null,
    public distancehopital?: number | null,
    public distanceclinique?: number | null,
    public urlPhotoPrincipale?: string | null,
    public urlPhoto1?: string | null,
    public urlPhoto2?: string | null,
    public urlPhoto3?: string | null,
    public urlPhoto4?: string | null,
    public urlPhoto5?: string | null,
    public urlPhoto6?: string | null,
    public urlVideo?: string | null
  ) {
    this.acceEelectricite = this.acceEelectricite ?? false;
    this.accesEau = this.accesEau ?? false;
    this.accesADSL = this.accesADSL ?? false;
    this.meuble = this.meuble ?? false;
  }
}

export function getProprieteIdentifier(propriete: IPropriete): number | undefined {
  return propriete.id;
}
