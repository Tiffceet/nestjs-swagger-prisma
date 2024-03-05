import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/app/providers/prisma/prisma.service";

@Injectable()
export class UserCrudService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  create = this.prisma.client.user.create;
  createMany = this.prisma.client.user.createMany;
  findFirst = this.prisma.client.user.findFirst;
  findMany = this.prisma.client.user.findMany;
  update = this.prisma.client.user.update;
  updateMany = this.prisma.client.user.updateMany;
  delete = this.prisma.client.user.delete;
  deleteMany = this.prisma.client.user.deleteMany;

  async findManyPaginated(...arguments_: Parameters<typeof this.findMany>) {
    arguments_[0].take = arguments_[0]?.take
      ? Number(arguments_[0]?.take)
      : 100;
    arguments_[0].skip = arguments_[0]?.skip ? Number(arguments_[0]?.skip) : 0;

    const data = await this.prisma.client.user.findMany(...arguments_);
    const count = await this.prisma.client.user.count({
      where: arguments_[0]?.where,
    });

    const take = arguments_[0].take;
    const skip = arguments_[0].skip;

    const perPage = take;
    const page = Math.floor(skip / take + 1);
    const lastPage = Math.ceil(count / perPage);
    return {
      meta: {
        currentPage: page,
        perPage: perPage,
        total: count,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
        lastPage,
      },
      data,
    };
  }
}
