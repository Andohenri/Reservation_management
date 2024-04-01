import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

import './index.css'
import Trip from './pages/Trip.jsx'
import TripDetails from './pages/TripDetails.jsx'
import TripProposition from './pages/TripProposition.jsx'
import ReservationManagement from './pages/ReservationManagement.jsx'
import Profile from './pages/Profile.jsx'
import Contact from './pages/Contact.jsx'
import InfoPolitics from './pages/InfoPolitics.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<App/>} >

            <Route index element={<Home />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>

            <Route path='' element={<PrivateRoute />}>
              {/* 
                * Permet au user de rechercher des voyages en fonction de la destination, de la date, de l'heure
                * Affiche les resultats de la recherches avec les detailles sur le svoyages dispo
              */}
              <Route path='/trip' element={<Trip />} />
              {/* 
                * Affiche des informations detailles sur un voyage specifique, y compris l'itineraire, les horaire, les prix, etc
                * Permet au utilisateurs de reserver des billets pour ce voyages
              */}
              <Route path='/trip:id' element={<TripDetails />} /> 
              {/* 
                * Permet au utilisateur de proposer des dates et des itineraires pour les voyages qu'ils souhaitent effectuer
                * Affiche un formulaire ou les users peuvent saisir les details de leur proposition
              */}
              <Route path='/trip-roposition' element={<TripProposition />} />
              {/* 
                * Permet au utilisateur de visualiser et de gerer leurs reservation existants, y compris l'annulation et la modification des reservations
                * Affiche les detaills des reservations , y compris les dates, les itineraires, les prix, etc
              */}
              <Route path='/reservation-management' element={<ReservationManagement />} />
              {/* 
                * Permet au utilisateur de gerer leurs informations personnelles,
                * Affiche un resume des reservations passes et des voyages a venir pour l'users
              */}
              <Route path='/profile' element={<Profile />} />
              {/* 
                * Permet au utilisateur de soumettre des requetes ou des problemes a l'equipe d'assistance 
                * Fournit des informations pour l'assistance clientele et les questions generales 
              */}
              <Route path='/contact' element={<Contact />} />
              {/* 
                * Fournit des informations sur l'entreprise, les politiques de reservation, les conditions d'utilisations
              */}
              <Route path='/info-politics' element={<InfoPolitics />} />
              {/* 
                * Permet au admin de gerer les voyages dispo, CRUD
                * Affiche une liste des voyages existants et des demandes de voyages propose par les clients
              */}
              <Route path='' element={<Dashboard />}>
                <Route path='/dashboard' element={<InfoPolitics />}/>
              </Route>
            </Route>
          </Route>
        </Routes>
        
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
