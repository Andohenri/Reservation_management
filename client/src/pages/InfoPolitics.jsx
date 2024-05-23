import React from 'react'
import { MdOutlineFactory, MdOutlineMail, MdOutlinePhoneIphone, MdOutlinePlace } from 'react-icons/md'

const InfoPolitics = () => {
  return (
    <main className='max-w-5xl mx-auto p-6'>
      <h1 className='head_text mb-2'>Bienvenue sur Train-Trip !</h1>
      <p className="text-lg font-semibold text-white rounded bg-[#FAB440] px-2 w-fit">Votre guichet unique pour des voyages en train simples et pratiques.</p>
      <section>
        <div className='desc py-4 flex flex-col gap-2'>
          <h2 className='font-extrabold mb-4'><span className='text-indigo-500 text-2xl font-extrabold mr-2'>#</span>Pourquoi choisir Train-Trip ?</h2>
          <p className='border-l-[5px] rounded shadow font-semibold border-l-[#FAB440] bg-white p-2'>Que vous soyez un voyageur d'affaires chevronné ou un aventurier en herbe, Train-Trip est votre plateforme de réservation de train tout-en-un. Avec notre interface conviviale et nos fonctionnalités puissantes, vous pouvez trouver, réserver et gérer vos voyages en train en quelques clics.</p>
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
          <h2 className='font-extrabold mb-4'><span className='text-indigo-500 text-2xl font-extrabold mr-2 mb-4'>#</span>Politique de confidentialité</h2>
          <p className='border-l-[5px] rounded shadow font-semibold border-l-[#FAB440] bg-white p-2'>Train-Trip s'engage à protéger votre vie privée.</p>
          <ul className='list-inside list-disc flex flex-col gap-2'>
            <li>Nous recueillons des informations auprès de vous lorsque vous utilisez notre site Web ou notre application. Ces informations peuvent inclure votre nom, votre adresse e-mail, votre numéro de téléphone et vos informations de paiement. Nous utilisons ces informations pour vous fournir nos services, pour améliorer notre application et pour vous envoyer des communications marketing.</li>
            <li>Nous ne partagerons vos informations personnelles avec aucun tiers sans votre consentement. Nous prenons des mesures de sécurité pour protéger vos informations personnelles contre la perte, l'utilisation abusive et l'accès non autorisé.</li>
            <li>Vous avez le droit d'accéder à vos informations personnelles et de les mettre à jour. Vous avez également le droit de demander la suppression de vos informations personnelles.</li>
            <li id='termofuse'>Pour en savoir plus sur notre politique de confidentialité, veuillez consulter notre site Web ou contacter notre équipe d'assistance clientèle.</li>
          </ul>
        </div>
      </section>
      <section>
        <div className='desc py-4 flex flex-col gap-2'>
          <h2 className='font-extrabold mb-4'><span className='text-indigo-500 text-2xl font-extrabold mr-2'>#</span>Conditions d'utilisation</h2>
          <p className='border-l-[5px] rounded shadow font-semibold border-l-[#FAB440] bg-white p-2'>En utilisant notre application ou notre site Web, vous acceptez d'être lié par les présentes conditions d'utilisation. Veuillez lire attentivement ces conditions avant de continuer à utiliser notre service.</p>
          <div className='py-4'>
            <h3 className='font-bold'>1. Définitions</h3>
            <ul className='list-inside list-disc'>
              <li><span className="strong">"Nous"</span>, <span className="strong">"notre"</span> et <span className="strong">"nos"</span> font référence à Train Company, le propriétaire et l'exploitant de Train-Trip.</li>
              <li><span className="strong">"Vous"</span>, <span className="strong">"votre"</span> et <span className="strong">"vos"</span> font référence à l'utilisateur de Train-Trip.</li>
              <li><span className="strong">"Application"</span> fait référence à l'application mobile Train-Trip et au site Web [https://example.com/](https://example.com/).</li>
              <li><span className="strong">"Service"</span> fait référence à tous les services fournis par Train-Trip, y compris la réservation de billets de train, la gestion de voyages et le support client.</li>
              <li><span className="strong">"Contenu"</span> fait référence à toutes les informations, données, textes, images, vidéos et autres éléments mis à disposition sur le Service.</li>
            </ul>
          </div>
          <div className='py-4'>
            <h3 className='font-bold'>2. Acceptation des conditions</h3>
            <p>En accédant ou en utilisant l'Application ou le Service, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, vous ne devez pas accéder ou utiliser l'Application ou le Service.</p>
          </div>
          <div className='py-4'>
            <h3 className='font-bold'>3. Accès et utilisation de l'Application</h3>
            <ul className='list-inside list-disc'>
              <li>Vous devez avoir au moins 18 ans pour utiliser l'Application ou le Service.</li>
              <li>Vous devez créer un compte pour utiliser certaines fonctionnalités de l'Application ou du Service. Vous êtes responsable de la confidentialité de votre mot de passe et de toutes les activités qui se déroulent sous votre compte.</li>
              <li>Vous acceptez d'utiliser l'Application et le Service uniquement à des fins légales et éthiques.</li>
              <li>Vous acceptez de ne pas utiliser l'Application ou le Service pour :</li>
              <li>Enfreindre les lois ou règlements en vigueur.</li>
              <li>Harceler, abuser ou menacer d'autres personnes.</li>
              <li>Diffuser des informations fausses ou trompeuses.</li>
              <li>Diffuser des virus ou d'autres logiciels malveillants.</li>
              <li>Interférer avec le fonctionnement normal de l'Application ou du Service.</li>
            </ul>
          </div>
          <div className='py-4'>
            <h3 className='font-bold'>4. Contenu</h3>
            <ul className='list-inside list-disc'>
              <li>Le contenu de l'Application et du Service est fourni à titre d'information uniquement et ne constitue pas un conseil juridique, financier ou médical.</li>
              <li>Nous ne sommes pas responsables de l'exactitude, de l'exhaustivité ou de la pertinence du contenu.</li>
              <li>Vous acceptez de ne pas utiliser le contenu de l'Application ou du Service à des fins illégales ou contraires à l'éthique.</li>
              <li>Vous acceptez de ne pas copier, reproduire, distribuer ou modifier le contenu de l'Application ou du Service sans notre autorisation écrite préalable.</li>
            </ul>
          </div>
          <div className='py-4'>
            <h3 className='font-bold'>5. Propriété intellectuelle</h3>
            <ul className='list-inside list-disc'>
              <li>L'Application, le Service et tout le contenu sont protégés par des droits d'auteur, des marques commerciales et d'autres droits de propriété intellectuelle.</li>
              <li>Vous ne devez pas utiliser l'Application, le Service ou le Contenu sans notre autorisation écrite préalable.</li>
            </ul>
          </div>
          <div className='py-4'>
            <h3 className='font-bold'>6. Limites de responsabilité</h3>
            <ul className="list-inside list-disc">
              <li>Nous ne sommes pas responsables des dommages directs, indirects, accessoires, spéciaux ou consécutifs découlant de l'utilisation de l'Application ou du Service.</li>
              <li>Nous ne sommes pas responsables des interruptions de service, des problèmes techniques ou des pertes de données.</li>
              <li>Vous acceptez d'indemniser et de nous dégager de toute responsabilité en cas de réclamation, de perte ou de dommage résultant de votre utilisation de l'Application ou du Service.</li>
            </ul>
          </div>
          <div className='py-4'>
            <h3 className='font-bold'>7. Modifications des conditions</h3>
            <ul className="list-inside list-disc">
              <li>Nous pouvons modifier les présentes conditions d'utilisation à tout moment.</li>
              <li>Les conditions modifiées entreront en vigueur dès leur publication sur l'Application ou le Service.</li>
              <li>Si vous n'acceptez pas les conditions modifiées, vous devez cesser d'utiliser l'Application ou le Service.</li>
            </ul>
          </div>
          <div className='py-4'>
            <h3 className='font-bold'>8. Résiliation</h3>
            <p>Nous pouvons résilier votre compte à tout moment, sans préavis, pour quelque raison que ce soit.</p>
            <p>Vous pouvez résilier votre compte à tout moment en contactant notre équipe d'assistance clientèle.</p>
          </div>
          <div className='py-4'>
            <h3 className='font-bold'>9. Loi applicable et juridiction</h3>
            <ul className='list-inside list-disc'>
              <li>Les présentes conditions d'utilisation sont régies par et interprétées conformément au droit malgaches.</li>
              <li>Tout litige découlant de ou lié aux présentes conditions d'utilisation sera soumis à la compétence exclusive des tribunaux malgaches.</li>
            </ul>
          </div>
          <div className='py-4'>
            <h3 className='font-bold'>10. Divers</h3>
            <p>Les présentes conditions d'utilisation constituent l'intégralité de l'accord</p>
          </div>
        </div>
      </section>
      <section className='bg-[#07143F] bg-opacity-90 backdrop-blur-lg text-gray-200 rounded p-4'>
        <div className='text_white flex flex-col gap-2'>
          <h2 className='font-extrabold'><span className='text-indigo-500 text-2xl font-extrabold mr-2'>#</span>Mentions légales</h2>
          <div className='flex flex-wrap font-semibold p-4 justify-between gap-4'>
            <div>
              <p><MdOutlineFactory className='mr-2 inline' />Train Company</p>
              <p><MdOutlinePlace className='mr-2 inline' />Rue de Destin Finarantsoa 302</p>
              <p><MdOutlinePhoneIphone className='mr-2 inline' />+261 20 22 202 02</p>
              <p><MdOutlineMail className='mr-2 inline' />trip@train_company.org</p>
              <p>Directeur de la publication: Ando Henri</p>
            </div>
            <div>
              <p>**Hébergeur:** [Nom de l'hébergeur]</p>
              <p>**[Adresse de l'hébergeur]**</p>
              <p>**[Numéro de téléphone de l'hébergeur]**</p>
              <p>**[Adresse e-mail de l'hébergeur]**</p>
            </div>
          </div>
        </div>
        <div className='text-sm font-bold p-4'>
          <p>Ce site Web est régi par le droit malgaches.</p>
          <p>En accédant à ce site Web, vous acceptez d'être lié par les présentes conditions d'utilisation.</p>
          <p>Nous nous réservons le droit de modifier les présentes conditions d'utilisation à tout moment.</p>
          <p>Si vous avez des questions concernant les présentes conditions d'utilisation, veuillez contacter notre équipe d'assistance clientèle.</p>
        </div>
      </section>
    </main>
  )
}

export default InfoPolitics