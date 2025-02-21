import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  async createUser(data: { name: string; email: string; document: string }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        document: data.document,
      },
    });
  }

  async getUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, data: { name?: string; email?: string; document?: string; isActive?: boolean }) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserService();
