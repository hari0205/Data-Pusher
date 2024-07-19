import { PrismaClient } from "@prisma/client";

class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {} // Private constructor to prevent direct instantiation

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
      PrismaSingleton.instance.$connect();
    }
    return PrismaSingleton.instance;
  }
}

export default PrismaSingleton.getInstance();
