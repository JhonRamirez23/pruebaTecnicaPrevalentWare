module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Mapea los paths en tsconfig
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  // Ignora pruebas en node_modules y en la carpeta .next
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};
