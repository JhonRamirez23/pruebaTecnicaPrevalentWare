import { resolvers } from '../graphql/resolvers';

test("addTransaction crea un nuevo movimiento", async () => {
  // Simula un contexto con un usuario ADMIN
  const context = { user: { id: 1, role: "ADMIN" } };
  const args = {
    concept: "Venta de producto",
    amount: 100.0,
    date: "2025-03-09T00:00:00.000Z",
  };

  // Aquí se simula la función; en pruebas reales, se usaría un mock de prisma
  const result = await resolvers.Mutation.addTransaction(null, args, context);
  expect(result.concept).toBe(args.concept);
});
