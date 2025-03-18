import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule], // importare il modulo Api
})
export class AppModule {}
