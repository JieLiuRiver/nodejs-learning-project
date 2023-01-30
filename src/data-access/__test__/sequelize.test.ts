import { Sequelize } from 'sequelize';
import sequelize, { connectSequelize } from '../sequelize';

describe('sequelize', () => {
  it('should create a new Sequelize instance', () => {
    expect(sequelize).toBeInstanceOf(Sequelize);
  });

  it('should throw an error if the connection fails', async () => {
    try {
      await connectSequelize();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
