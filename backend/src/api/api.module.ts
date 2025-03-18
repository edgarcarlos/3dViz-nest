import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

@Module({  // è un decorator
  providers: [ApiService],    // collega il servizio
  controllers: [ApiController],  // collega il controller
})
export class ApiModule {}
