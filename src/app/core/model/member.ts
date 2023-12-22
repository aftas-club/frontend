import {IdentityDocumentType} from "../enum/identity-document-type";
import {Gender} from "../enum/gender";

export interface Member {
  name: string | null | undefined;
  familyName: string | null | undefined;
  birthDate: Date | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  gender: Gender | null | undefined;
  accessionDate: Date | null | undefined;
  nationality: string | null | undefined;
  identityDocument: IdentityDocumentType | null | undefined;
  identityNumber: string | null | undefined;
}
