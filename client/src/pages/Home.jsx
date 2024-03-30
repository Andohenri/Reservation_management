import React from 'react'
import logo from '../assets/react.svg'

const Home = () => {
  return (
    <main className='max-w-5xl mx-auto p-6'>
      <header className='flex max-md:flex-col-reverse gap-4 md:flex-row lg:h-[90vh] mb-6'>
        <div className='flex-1 flex flex-col gap-4 justify-center items-start max-md:text-center'>
          <h1 className='head_text'>Bienvenue sur [Nom de l'application] - Votre plateforme ultime de réservation de train !</h1>
          <p className='desc'>
            Découvrez une expérience de réservation fluide et sans souci avec [Nom de l'application]. 
            Que vous planifier un court trajet ou un long voyage, notre plateforme offre un moyen pratique 
            et fiable de réserver vos billets de train en toutes simplicité. Dites adieu aux longues files d'attentes et aux tracas de réservation de dernier minutes - 
            [Nom de l'application] est là pour rendre votre expérience de voyage agréable et sans stresse.
          </p>
          <button className='btn_primary mt-4'>Réserver vos places des maintenant</button>
        </div>
        <div className='md:flex-1 flex justify-center '>
          <img src={logo} alt="logo" className=''/>
        </div>
      </header>
      <section>
        <h1 className='text-2xl font-bold mb-4'>A propos</h1>
        <div className='flex flex-row flex-wrap gap-4'>
          <article className='w-full max-w-64 bg-slate-500 text-white p-3 rounded-lg'>
            <h1 className='text-xl font-semibold'>Processus de reservation facile</h1>
            <p>En quelques clics, réserver vos billets de train et recevew une confirmation instantanée.</p>
          </article>
          <article className='w-full max-w-xs bg-slate-500 text-white p-2 rounded-lg'>
            <h1 className='text-xl font-semibold'>Large sélection de trains</h1>
            <p>Choisissez parmi une variété de trains, chacun offrant différents commodités et options de voyage pour répondre à vos besoins.</p>
          </article>
          <article className='w-full max-w-xs bg-slate-500 text-white p-2 rounded-lg'>
            <h1 className='text-xl font-semibold'>?ise à jour en temps réel</h1>
            <p>Rester informé de votre voyage avec des mises en temps réel sur les horaires des trains, les retards et plus encore.</p>
          </article>
          <article className='w-full max-w-xs bg-slate-500 text-white p-2 rounded-lg'>
            <h1 className='text-xl font-semibold'>Paiement sécurisé</h1>
            <p>Notre passerele de paiement sécurisé garantit que vos transactions sont sures et protégés.</p>
          </article>
          <article className='w-full max-w-xs bg-slate-500 text-white p-2 rounded-lg'>
            <h1 className='text-xl font-semibold'>Service client 24/7</h1>
            <p>Notre equipe de support client dévouée est disponible 24h/24 et 7j/7 pour vous aider avec toutes vos questions ou problèmes.</p>
          </article>
        </div>
      </section>
      <section>
        <h1 className='text-2xl font-bold mb-4'>Caracteristique</h1>
        <p>Mise en avant de pricipales caracteristiques et fonctionalites de l'application - Utilisation des icones ou d'images pour illustrer chaque fonctionnalites</p>
      </section>
      <section>
        <h1 className='text-2xl font-bold mb-4'>Comment ça marche ?</h1>
        <p>Explication etape par etape du processus de reservation de train sur le plateforme - Utilisation des visuels ou des captures d'ecran pour guider les utilisateurs</p>
      </section>
      <section>
        <h1 className='text-2xl font-bold mb-4'>Selection des trains</h1>
        <p>
          Presentation des different types des trains disponible a la reservation - Possibilite de filtrer les trains par destinations, horaires, etc.
        </p>
      </section>
      <section>
        <h1 className='text-2xl font-bold mb-4'>Temoignages</h1>
        <p>Temoignages de clients satisfaits qui ont utilises votre service de reservation de train - Renforcement de la confiance des utilisateurs potentiels en montrant des retours positifs.</p>
      </section>
      <section>
        <h1 className='text-2xl font-bold mb-4'>Appel a l'action</h1>
        <p>invitation claire a reserver des billets de train sur l'application - Buttons d;appel a l'action bien visible.</p>
      </section>
      <footer>
        <p>Lien vers laes pages de politique de confidentialite ,conditions d'utilisations, etc</p>
        <p>Coordonnee e contact sur l'entreprise</p>
        <p>Copyright et mentions legales</p>
      </footer>
    </main>
  )
}

export default Home