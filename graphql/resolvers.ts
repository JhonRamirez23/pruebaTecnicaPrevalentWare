import { PrismaClient } from '@prisma/client';
import { AuthenticationError, ForbiddenError } from 'apollo-server-errors';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
      const userData = await prisma.user.findUnique({
        where: { id: context.user.id },
        include: { transactions: true },
      });
      if (!userData) throw new Error('User not found');
      return userData;
    },
    users: async (_: any, __: any, context: any) => {
      if (context.user?.role !== 'ADMIN') {
        throw new ForbiddenError('Access denied');
      }
      return prisma.user.findMany({ include: { transactions: true } });
    },
    transactions: async () => {
      return prisma.transaction.findMany({ include: { user: true } });
    },
  },
  Mutation: {
    updateUser: async (_: any, args: any, context: any) => {
      if (context.user?.role !== 'ADMIN')
        throw new ForbiddenError('Access denied');
      return prisma.user.update({
        where: { id: args.id },
        data: { name: args.name, role: args.role },
      });
    },
    createUser: async (_: any, args: any) => {
      return prisma.user.create({
        data: { name: args.name, email: args.email, role: args.role },
      });
    },
    addTransaction: async (_: any, args: any, context: any) => {
      // Verifica que el usuario esté autenticado
      if (!context.user) throw new AuthenticationError('No autenticado');
      // Verifica que el usuario tenga rol ADMIN
      if (context.user.role !== 'ADMIN')
        throw new ForbiddenError('Acceso denegado');
      // Si pasa el check, crea la transacción
      return prisma.transaction.create({
        data: {
          concept: args.concept,
          amount: args.amount,
          date: new Date(args.date),
          user: { connect: { id: context.user.id } },
        },
        include: { user: true },
      });
    },
  },
};
