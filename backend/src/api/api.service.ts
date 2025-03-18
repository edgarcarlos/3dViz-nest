import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

/*il service è un singleton (unica istanza per tutta l'app), 
è la parte che contiene la logica (di business) dell'applicazione,
*/

export interface RawData {
    id: number;
    labelX: string;
    value: number;
    labelZ: string;
}
  
export  interface Legend {
    x: string;
    y: string;
    z: string;
}


@Injectable() 
export class ApiService {

    private readonly cities = [
        { id: 0, name: 'Berlin', latitude: 52.548, longitude: 13.41 },
        { id: 1, name: 'Paris', latitude: 48.54, longitude: 2.27 },
        { id: 2, name: 'Rome', latitude: 41.93, longitude: 12.56 },
        { id: 3, name: 'Madrid', latitude: 40.39, longitude: -3.68 },
    ];

    // metodo per fetch da Api con dati correnti
    async fetchApiK(): Promise<{ data: RawData[]; legend: Legend }> {
        const key = process.env.API_KEY;
        const url = process.env.API_URL;
    
        if (!key || !url) {
          throw new HttpException('API key or URL missing', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    
        const legend: Legend = {
            x: 'DateTime',
            y: 'Temperature',
            z: 'City',
        };
    
        try {
            const promises = this.cities.map((item) => axios.get(`${url}?access_key=${key}&query=${item.name}`));
            const results = await Promise.all(promises);
            const data: RawData[] = results.map((r, index) => ({
                id: index,
                labelX: r.data.location.name,
                value: r.data.current.temperature,
                labelZ: r.data.location.localtime,
            }));

            return { data, legend };
        } catch (error) {
            throw new HttpException('Errore nel recupero dei dati', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // metodo per fetch da dati storici
    async fetchHistorical(): Promise<{ data: RawData[]; legend: Legend }> {
        const latitudes = this.cities.map((city) => city.latitude).join(',');
        const longitudes = this.cities.map((city) => city.longitude).join(',');
        const URL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitudes}&longitude=${longitudes}&start_date=2024-01-01&end_date=2024-01-10&hourly=temperature_2m`;
    
        const legend: Legend = {
            x: 'DateTime',
            y: 'Temperature',
            z: 'City',
        };
    
        try {
            console.log('Fetching data from URL:', URL);
            const response = await axios.get(URL);
            console.log('data fetched:', response.data);
          
            const data: RawData[] = [];
            for (let i = 0; i < this.cities.length; i++) {
                const hours: string[] = response.data[i].hourly.time;
                const values: number[] = response.data[i].hourly.temperature_2m;
                for (let j = 0; j < hours.length; j++) {
                    const entry: RawData = { id: j * this.cities.length + i, labelX: hours[j].replace('T', ' '), value: values[j], labelZ: this.cities[i].name };
                    data.push(entry);
                }
            }
            return { data, legend };

        } catch (error) {
            throw new HttpException('Errore nel recupero dei dati', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


