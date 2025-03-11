import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/authConfig';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    return {
      user: session?.user
        ? { ...session.user, id: Number((session.user as any).id), role: (session.user as any).role as 'ADMIN' | 'USER' }
        : undefined,
    };
  },
});

