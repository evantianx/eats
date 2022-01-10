import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModuleOptions } from './interfaces/jwtModuleOptions.interface';
import { JWTMODULEOPTIONS } from './jwt.constants';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      imports: [],
      providers: [
        {
          provide: JWTMODULEOPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
