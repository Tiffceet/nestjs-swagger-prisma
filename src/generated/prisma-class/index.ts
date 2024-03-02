import { User as _User } from "./user";

export namespace PrismaModel {
  export class User extends _User {}

  export const extraModels = [User];
}
