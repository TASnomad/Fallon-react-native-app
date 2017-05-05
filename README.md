# Fallon-react-native-app
-------------------------

Application mobile du projet tutoré Fallon

Le projet Fallon est un dispositif pour le département informatique de l'IUT Sénart Fontainebleau.
Ce projet est constitué des composants suivants:

* Un système d'alerte par abonnement
* Une application mobile pour les étudiants, qui a différents composants:
 * Un emploi du temps selon la promotion du compte
 * Un dashboard montrant toutes les informations laissées par l'administration

 # Note importante
 -----------------

Phase béta __lancée__ sur le play store: https://play.google.com/store/apps/details?id=com.fallon.app&hl=fr
Phase béta iOS à venir

 # Note pour les devs
 --------------------

__Mise en ligne sur les stores__
 __A modifier__
  * Android:
    **AndroidManifest.xml**
     ```
      android:versionCode="X", android:versionName="X.Y"
      ```
    **build.gradle**
      ```
      versionCode X, versionName="X.Y"
      ```
  * IOS:
    *  __A venir ...__


__Android__
  * Ajout(s):
    * Ajout d'une section pour récupérer les fichiers mis en libre service pour sa promotion
  * Modification(s):
    * Modification / remplacement du module Lightbox


__Développement iOS démarré__
 * BUG(S):
  * Notifications iOS non implémentée
  * EDT sur iOS dashboard non affichable
