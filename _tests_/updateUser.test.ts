import { resolvers } from '../graphql/resolvers';

test('updateUser actualiza el nombre y rol correctamente', async () => {
  const context = { user: { id: 1, role: 'ADMIN' } };
  const args = { id: 1, name: 'Nuevo Nombre', role: 'ADMIN' };

  const result = await resolvers.Mutation.updateUser(null, args, context);
  expect(result.name).toBe('Nuevo Nombre');
});
