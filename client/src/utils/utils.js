import moment from 'moment'
import 'moment/dist/locale/fr';
moment.locale('fr');

export function subtract(amount, date) {
   return moment(date).subtract(amount, 'hours')
}

export function setSatus(status) {
   if (status === 'cancelled') {
      return 'Annuler'
   } else if (status === 'in progress') {
      return 'En Route'
   } else if (status === 'pending') {
      return 'En attente'
   } else {
      return 'Arrivé'
   }
}
export function uniqueArray(arr) {
   const uniqueSet = new Set(arr)
   return [...uniqueSet]
}
export function capitalized(str){
   return str.charAt(0).toUpperCase() + str.slice(1)
}