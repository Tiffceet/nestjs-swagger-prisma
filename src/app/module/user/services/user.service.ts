import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/app/providers/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  async createUser(name: string) {
    return await this.prisma.client.user.create({ data: { name } });
  }
}
