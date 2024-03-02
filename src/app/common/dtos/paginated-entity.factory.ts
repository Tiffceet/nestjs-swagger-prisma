import { Type } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

@Expose()
class PaginationMeta {
  @ApiProperty({ required: false })
  currentPage: number | null;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  total: number;

  @ApiProperty({ required: false })
  next: number | null;

  @ApiProperty({ required: false })
  prev: number | null;

  @ApiProperty({ required: false })
  lastPage: number | null;
}

export function PaginatedEntityFactory<T>(classReference: Type<T>) {
  @Expose()
  class ConstructedClass {
    @ApiProperty()
    meta: PaginationMeta;

    @ApiProperty({ type: () => [classReference] })
    data: T[];
  }

  return ConstructedClass;
}
