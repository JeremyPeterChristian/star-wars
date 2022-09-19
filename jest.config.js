module.exports = {
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          '@babel/preset-react'
        ]
      }
    ]
  },
  testEnvironment: 'jsdom',
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  setupFiles: ['<rootDir>/jest-setup/media-mock.js']
};
