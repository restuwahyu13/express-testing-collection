module.exports = {
	testMatch: [
		'<rootDir>/test/**/*.{test.js, spec.js}',
		'<rootDir>/tests/**/*.{test.js, spec.js}',
		'<rootDir>/__test__/**/*.{test.js, spec.js}',
		'<rootDir>/__tests__/**/*.{test.js, spec.js}'
	],
	testEnvironment: 'node',
	clearMocks: true,
	testTimeout: 30000
}
