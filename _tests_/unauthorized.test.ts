import { resolvers } from '../graphql/resolvers';

test("addTransaction rechaza si el usuario no es ADMIN", async () => {
  const context = { user: { id: 2, role: "USER" } };
  const args = {
    concept: "Ingreso no autorizado",
    amount: 50.0,
    date: "2025-03-09T00:00:00.000Z",
  };

  await expect(
    resolvers.Mutation.addTransaction(null, args, context)
  ).rejects.toThrow("Acceso denegado");
});
