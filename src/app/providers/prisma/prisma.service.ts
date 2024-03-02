import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";

import { Prisma, PrismaClient } from "@prisma/client";

// Prepare Prisma extenstion ability
const createPrismaClient = (options: Prisma.PrismaClientOptions) => {
  return new PrismaClient(options);
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient!: ExtendedPrismaClient;

  public get client(): ExtendedPrismaClient {
    return this.prismaClient;
  }

  constructor() {
    this.prismaClient = createPrismaClient({
      errorFormat: "minimal",
    });
  }

  async onModuleInit(): Promise<void> {
    await this.prismaClient.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.prismaClient.$disconnect();
  }
}
