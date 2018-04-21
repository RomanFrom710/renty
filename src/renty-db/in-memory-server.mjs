import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';

import {env} from 'renty-config';

class InMemoryServer {
  /**
   * Creates temporary in-memory server and connects to it.
   */
  async connect() {
    if (!env.isTest()) {
      throw new Error('In-memory server should be used only in test scripts');
    }

    if (this.server) {
      throw new Error('There may be only one in-memory server');
    }

    this.server = new MongodbMemoryServer();
    const connectionString = await this.server.getConnectionString();
    await mongoose.connect(connectionString);
  }

  /**
   * Disconnects from the temporary in-memory server and disposes it.
   */
  async disconnect() {
    if (!this.server) {
      throw new Error('There is no in-memory server to disconnect from');
    }

    await mongoose.disconnect();
    await this.server.stop();
    this.server = null;
  }
}

const server = new InMemoryServer();
export default server;
