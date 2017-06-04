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
  * Correction(s):
    * Emploi du temps de la promo LBDISE affichable
  * BUG(s):
    * Android 7, 7.1.1, 8.0 (aka O) retournent un ```permission denied``` quand react-native-fetch-blob télécharge un fichier dans le dossier data de l'application
      * HACK: téléchargement sauvegardé dans le dossier ``` Download ``` de l'appareil
  * TODO:
    * Ajout de timeout sur les appels AJAX
    * Centralisation de données de l'application


__Développement iOS démarré__
 * BUG(S):
  * Notifications iOS non implémentée
    * WONTFIX: APN (Apple push notifications) non récupérables
