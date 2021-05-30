import { Config } from '@jest/types'

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
	testMatch: [
		'<rootDir>/src/test/**/*.{test.ts, spec.ts}',
		'<rootDir>/src/tests/**/*.{test.ts, spec.ts}',
		'<rootDir>/src/__test__/**/*.{test.ts, spec.ts}',
		'<rootDir>/src/__tests__/**/*.{test.ts, spec.ts}'
	],
	testPathIgnorePatterns: ['node_modules/', 'dist/', 'tsconfig.json', 'src/__tests__/mock-data'],
	testTimeout: 0,
	clearMocks: true
}

export default config
