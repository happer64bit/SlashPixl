module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start', // Command to start your Next.js app
      url: ['http://localhost:3000'], // URL to test
      numberOfRuns: 1, // Number of runs to average results
    },
    assert: {
      assertions: {
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'interactive': ['error', { maxNumericValue: 5000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage', // Use 'temporary-public-storage' for quick testing
    },
  },
};
