import moment from 'moment'
import 'moment/dist/locale/fr';
moment.locale('fr');

export function subtract(amount, date){
   return moment(date).subtract(amount, 'hours')
}