import moment from 'moment'
import 'moment/dist/locale/fr';
moment.locale('fr');

export function subtract(amount, date){
   return moment(date).subtract(amount, 'hours')
}

export function setSatus(status){
   if(status === 'cancelled'){
      return 'Annuler'
   }else if(status === 'in progress'){
      return 'En Route'
   }else if(status === 'pending'){
      return 'En attente'
   }else{
      return 'Arrivé'
   }
}