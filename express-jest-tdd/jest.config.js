module.exports = {
	testEnvironment: 'node',
	testMatch: [
		'<rootDir>/test/**/*.{test.js, spec.js}',
		'<rootDir>/tests/**/*.{test.js, spec.js}',
		'<rootDir>/__test__/**/*.{test.js, spec.js}',
		'<rootDir>/__tests__/**/*.{test.js, spec.js}'
	],
	testPathIgnorePatterns: ['node_modules/', 'dist/', 'tsconfig.json'],
	clearMocks: true,
	testTimeout: 0
}
