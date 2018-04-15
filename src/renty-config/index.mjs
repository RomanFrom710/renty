import convict from 'convict';

const convict = convict({
  env: {
    doc: "The application environment",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  db: {
      doc: "Database connection string",
      format: '*',
      default: 'mongodb://localhost:27017/renty',
      env: 'DB_CONNECTION',
  },
});
