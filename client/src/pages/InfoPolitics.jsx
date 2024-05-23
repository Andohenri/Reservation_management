import React from 'react'

const InfoPolitics = () => {
  return (
    <main className='max-w-5xl mx-auto p-6'>
      <h1 className='head_text mb-2'>Bienvenue sur Train-Trip !</h1>
      <p className="text-lg font-semibold text-white rounded bg-[#FAB440] px-2 w-fit">Votre guichet unique pour des voyages en train simples et pratiques.</p>
      <section>
        <div className='desc py-4 flex flex-col gap-2'>
          <p>Que vous soyez un voyageur d'affaires chevronné ou un aventurier en herbe, [Nom de votre application] est votre plateforme de réservation de train tout-en-un. Avec notre interface conviviale et nos fonctionnalités puissantes, vous pouvez trouver, réserver et gérer vos voyages en train en quelques clics.</p>
          <p className='bg-[#07143F] font-semibold text-white rounded px-2'>#Pourquoi choisir Train-Trip ?</p>
          <p>
            <span className='strong'>Large choix de trains:</span>
            Nous vous proposons un large éventail de trains parmi lesquels choisir, des trains à grande vitesse aux trains régionaux, pour répondre à tous vos besoins de voyage.
          </p>
          <p>
            <span className='strong'>Meilleurs prix garantis:</span>
            Nous trouvons les meilleurs prix pour vos voyages en train, afin que vous puissiez économiser de l'argent sur chaque voyage.
          </p>
          <p>
            <span className='strong'>Réservation facile et rapide:</span>
            Réservez vos billets de train en quelques clics, depuis le confort de votre maison ou de votre bureau.
          </p>
          <p>
            <span className='strong'>Gestion de voyage simplifiée:</span>
            Gérez vos réservations, suivez vos billets et accédez à vos informations de voyage en un seul endroit.
          </p>
          <p>
            <span id='politics' className='strong'>Support client 24h/24 et 7j/7:</span>
            Notre équipe d'assistance clientèle est disponible 24h/24 et 7j/7 pour vous aider à chaque étape de votre voyage.
          </p>
          <p>Avec Train-Trip, voyager en train n'a jamais été aussi simple et pratique.</p>
        </div>
      </section>
      <section>
        <div className='desc py-4 flex flex-col gap-2'>
          <p className='bg-[#07143F] font-semibold text-white rounded px-2'>#Politique de confidentialité</p>
          <p>Train-Trip s'engage à protéger votre vie privée.</p>
          <ul className='list flex flex-col gap-2'>
            <li>Nous recueillons des informations auprès de vous lorsque vous utilisez notre site Web ou notre application. Ces informations peuvent inclure votre nom, votre adresse e-mail, votre numéro de téléphone et vos informations de paiement. Nous utilisons ces informations pour vous fournir nos services, pour améliorer notre application et pour vous envoyer des communications marketing.</li>
            <li>Nous ne partagerons vos informations personnelles avec aucun tiers sans votre consentement. Nous prenons des mesures de sécurité pour protéger vos informations personnelles contre la perte, l'utilisation abusive et l'accès non autorisé.</li>
            <li>Vous avez le droit d'accéder à vos informations personnelles et de les mettre à jour. Vous avez également le droit de demander la suppression de vos informations personnelles.</li>
            <li id='termofuse'>Pour en savoir plus sur notre politique de confidentialité, veuillez consulter notre site Web ou contacter notre équipe d'assistance clientèle.</li>
          </ul>
        </div>
      </section>
      <section>
        <div className='desc py-4 flex flex-col gap-2'>
          <h2 className='bg-[#07143F] font-semibold text-white rounded px-2'>#Conditions d'utilisation</h2>
          En utilisant notre application ou notre site Web, vous acceptez d'être lié par les présentes conditions d'utilisation. Veuillez lire attentivement ces conditions avant de continuer à utiliser notre service.
          <div>
            <h3>1. Définitions</h3>
            <p>* "Nous", "notre" et "nos" font référence à [Nom de votre société], le propriétaire et l'exploitant de [Nom de votre application de réservation de train].</p>
            <p>* "Vous", "votre" et "vos" font référence à l'utilisateur de [Nom de votre application de réservation de train].</p>
            <p>* "Application" fait référence à l'application mobile [Nom de votre application de réservation de train] et au site Web [https://example.com/](https://example.com/).</p>
            <p>* "Service" fait référence à tous les services fournis par [Nom de votre application de réservation de train], y compris la réservation de billets de train, la gestion de voyages et le support client.</p>
            <p>* "Contenu" fait référence à toutes les informations, données, textes, images, vidéos et autres éléments mis à disposition sur le Service.</p>
          </div>

          <div>
            <h3>2. Acceptation des conditions</h3>
            <p>En accédant ou en utilisant l'Application ou le Service, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, vous ne devez pas accéder ou utiliser l'Application ou le Service.</p>
          </div>

          <div>
            <h3>3. Accès et utilisation de l'Application</h3>
            <p>* Vous devez avoir au moins 18 ans pour utiliser l'Application ou le Service.</p>
            <p>* Vous devez créer un compte pour utiliser certaines fonctionnalités de l'Application ou du Service. Vous êtes responsable de la confidentialité de votre mot de passe et de toutes les activités qui se déroulent sous votre compte.</p>
            <p>* Vous acceptez d'utiliser l'Application et le Service uniquement à des fins légales et éthiques.</p>
            <p>* Vous acceptez de ne pas utiliser l'Application ou le Service pour :</p>
            <p>* Enfreindre les lois ou règlements en vigueur.</p>
            <p>* Harceler, abuser ou menacer d'autres personnes.</p>
            <p>* Diffuser des informations fausses ou trompeuses.</p>
            <p>* Diffuser des virus ou d'autres logiciels malveillants.</p>
            <p>* Interférer avec le fonctionnement normal de l'Application ou du Service.</p>
          </div>

          <div>
            <h3>4. Contenu</h3>
            <p>* Le contenu de l'Application et du Service est fourni à titre d'information uniquement et ne constitue pas un conseil juridique, financier ou médical.</p>
            <p>* Nous ne sommes pas responsables de l'exactitude, de l'exhaustivité ou de la pertinence du contenu.</p>
            <p>* Vous acceptez de ne pas utiliser le contenu de l'Application ou du Service à des fins illégales ou contraires à l'éthique.</p>
            <p>* Vous acceptez de ne pas copier, reproduire, distribuer ou modifier le contenu de l'Application ou du Service sans notre autorisation écrite préalable.</p>
          </div>

          <div>
            <h3>5. Propriété intellectuelle</h3>
            <p>* L'Application, le Service et tout le contenu sont protégés par des droits d'auteur, des marques commerciales et d'autres droits de propriété intellectuelle.</p>
            <p>* Vous ne devez pas utiliser l'Application, le Service ou le Contenu sans notre autorisation écrite préalable.</p>
          </div>


          <div>
            <h3>6. Limites de responsabilité</h3>
            <p>* Nous ne sommes pas responsables des dommages directs, indirects, accessoires, spéciaux ou consécutifs découlant de l'utilisation de l'Application ou du Service.</p>
            <p>* Nous ne sommes pas responsables des interruptions de service, des problèmes techniques ou des pertes de données.</p>
            <p>* Vous acceptez d'indemniser et de nous dégager de toute responsabilité en cas de réclamation, de perte ou de dommage résultant de votre utilisation de l'Application ou du Service.</p>
          </div>

          <div>
            <h3>7. Modifications des conditions</h3>
            <p>* Nous pouvons modifier les présentes conditions d'utilisation à tout moment.</p>
            <p>* Les conditions modifiées entreront en vigueur dès leur publication sur l'Application ou le Service.</p>
            <p>* Si vous n'acceptez pas les conditions modifiées, vous devez cesser d'utiliser l'Application ou le Service.</p>
          </div>

          <div>
            <h3>8. Résiliation</h3>
            <p>Nous pouvons résilier votre compte à tout moment, sans préavis, pour quelque raison que ce soit.</p>
            <p>Vous pouvez résilier votre compte à tout moment en contactant notre équipe d'assistance clientèle.</p>
          </div>

          <div>
            <h3>9. Loi applicable et juridiction</h3>
            <p>* Les présentes conditions d'utilisation sont régies par et interprétées conformément au droit malgaches.</p>
            <p>* Tout litige découlant de ou lié aux présentes conditions d'utilisation sera soumis à la compétence exclusive des tribunaux malgaches.</p>
          </div>

          <div>
            <h3>10. Divers*</h3>
            <p>* Les présentes conditions d'utilisation constituent l'intégralité de l'accord</p>
          </div>
        </div>
      </section>
      <section>
        <div className='text py-4 flex flex-col gap-2'>
          <h2 className='bg-[#07143F] font-semibold text-white rounded px-2'>#Mentions légales</h2>
          <div className='flex justify-around gap-4'>
            <div>
              **[Nom de votre société]**
              **[Adresse de votre société]**
              **[Numéro de téléphone de votre société]**
              **[Adresse e-mail de votre société]**
              **[Numéro d'immatriculation de votre société]**
              **[Numéro de TVA de votre société]**
              **Directeur de la publication:** [Nom du directeur de la publication]
            </div>
            <div>
              **Hébergeur:** [Nom de l'hébergeur]
              **[Adresse de l'hébergeur]**
              **[Numéro de téléphone de l'hébergeur]**
              **[Adresse e-mail de l'hébergeur]**
            </div>
          </div>
        </div>
        <div>
          **Ce site Web est régi par le droit malgaches.**
          **En accédant à ce site Web, vous acceptez d'être lié par les présentes conditions d'utilisation.**
          **Nous nous réservons le droit de modifier les présentes conditions d'utilisation à tout moment.**
          **Si vous avez des questions concernant les présentes conditions d'utilisation, veuillez contacter notre équipe d'assistance clientèle.**
        </div>
      </section>
    </main>
  )
}

export default InfoPolitics