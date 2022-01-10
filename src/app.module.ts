import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/configuration';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { JwtModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(configuration),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ me: req.me }),
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    JwtModule.forRoot({
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRESIN,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    });
  }
}
