import dotenv from 'dotenv';
import {
  CognitoConfigs, Configs, AuthConfig, S3Configs, DynamoDBConfigs,
} from '../models/config-models';

export const initConfigs = (): Configs => {
  dotenv.config();
  // SIGNING_KEY, TOKEN_TTL
  const {
    USER_POOL_ID, USER_CLIENT_ID, TABLE_NAME, BUCKET_NAME, PASSWORD_SALT,
  } = process.env;

  if (!USER_POOL_ID || !USER_CLIENT_ID || !TABLE_NAME || !BUCKET_NAME || !PASSWORD_SALT) {
    throw new Error('ERROR! Invalid configs!');
  }

  return new Configs(
    new AuthConfig(
      new CognitoConfigs(USER_POOL_ID, USER_CLIENT_ID),
      Number(PASSWORD_SALT),
    ),
    new S3Configs(BUCKET_NAME),
    new DynamoDBConfigs(TABLE_NAME),
  );
};
