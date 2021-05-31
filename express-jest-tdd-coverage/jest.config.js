module.exports = {
	testEnvironment: 'node',
	testMatch: [
		'<rootDir>/test/**/*.{test.js, spec.js}',
		'<rootDir>/tests/**/*.{test.js, spec.js}',
		'<rootDir>/__test__/**/*.{test.js, spec.js}',
		'<rootDir>/__tests__/**/*.{test.js, spec.js}'
	],
	testPathIgnorePatterns: ['node_modules/'],
	collectCoverageFrom: ['<rootDir>/controllers/**/*'],
	coveragePathIgnorePatterns: ['node_modules/'],
	coverageReporters: ['text', 'html'],
	clearMocks: true,
	testTimeout: 0
}
