import convict from 'convict';

export const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  db: {
    doc: 'Database connection string',
    format: '*',
    default: 'mongodb://localhost:27017/renty',
    env: 'DB_CONNECTION',
  },
});

export const env = {
  isDev: () => process.env.NODE_ENV === 'development',
  isTest: () => process.env.NODE_ENV === 'test',
  isProd: () => process.env.NODE_ENV === 'production',
};
