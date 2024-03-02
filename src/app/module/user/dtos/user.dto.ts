import { OmitType, PartialType } from "@nestjs/swagger";
import { PaginatedEntityFactory } from "src/app/common/dtos/paginated-entity.factory";
import { User } from "src/generated/prisma-class/user";

export class CreateUserDto extends OmitType(User, ["id"]) {}
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class PaginatedUserEntity extends PaginatedEntityFactory(User) {}
