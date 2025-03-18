import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

/* il controller è la parte che gestisce le richieste HTTP e chiama 
il service per ottenere i dati*/

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    // si può usare @req e @res per accedere agli oggetti request e response
    
    @Get('/hcall') // il Get è un decorator che definisce il metodo HTTP
    async getHistoricalData() {
        console.log('Chiamata ricevuta per /api/hcall');
        return this.apiService.fetchHistorical();
    }
    
    @Get('/kcall')
      async getApiKData() {
        return this.apiService.fetchApiK();
    }
}
