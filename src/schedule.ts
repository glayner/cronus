import cron from 'node-cron'
import { main } from '.'

// Agenda para rodar de segunda a sexta (1-5) às 7, 12, 13 e 16 horas
const schedule = '0 7,12,13,16 * * 1-5';

cron.schedule(schedule, ()=> main(true))