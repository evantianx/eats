import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const configuration: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
  ignoreEnvFile: process.env.NODE_ENV === 'prod',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'test', 'prod').default('dev'),
    TYPEORM_CONNECTION: Joi.string().required(),
    TYPEORM_HOST: Joi.string().required(),
    TYPEORM_USERNAME: Joi.string().required(),
    TYPEORM_PASSWORD: Joi.string().required(),
    TYPEORM_DATABASE: Joi.string().required(),
    TYPEORM_PORT: Joi.number().required(), // Joi is not able to validate port as number (it's string)
    TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
    TYPEORM_LOGGING: Joi.boolean().required(),
    JWT_SECRET: Joi.string().required(),
  }),
} as const;
