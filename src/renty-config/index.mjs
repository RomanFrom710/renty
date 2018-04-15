import convict from 'convict';

const convict = convict({
  env: {
    doc: "The application environment",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: '*',
      default: 'mongodb://localhost:27017/renty',
      env: 'DB_HOST',
    },
    username: {
      doc: "Database name",
      format: '*',
      default: 'user',
      env: 'DB_USERNAME',
    },
    password: {
      doc: "Database password",
      format: '*',
      default: 'password',
      env: 'DB_PASSWORD',
    },
  },
});
