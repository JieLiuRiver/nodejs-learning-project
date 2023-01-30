module.exports = {
    preset: 'ts-jest',
    transform: { '^.+\\.ts?$': 'ts-jest' },
    moduleFileExtensions: ['ts', 'js'],
    modulePathIgnorePatterns: ['<rootDir>/lib/'],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1'
    }
    // testTimeout: 40000,
    // testEnvironment: "node"
};
