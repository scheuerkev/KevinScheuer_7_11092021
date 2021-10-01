<h1 align="center">Welcome to Groupomania  👋</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/scheuerkev" target="_blank">
    <img alt="Twitter: scheuerkev" src="https://img.shields.io/twitter/follow/scheuerkev.svg?style=social" />
  </a>
</p>

> Groupomania met à disposition de ses collaborateurs un espace de partage de posts.
> <br >Retrouvez sur ce repository, l'ensemble des fichiers et des actions nécessaires au fonctionnement du projet.
> 


## Description technique du projet

### Fonctionnalités
* Création de compte utilisateur avec stockage sécurisé de mot de passe.
* Modification de données utilisateur. Suppression de compte utilisateur.
* Ajout de post et d'images. Suppression des posts.
* Ajout de commentaires. Suppression des commentaires.
* Comportement en cascade.
* Persistance de session durant la navigation et authentification des routes back et front.
* Modération avec un compte administrateur.

### Pile technique
* Front : Vue.js | Vuetify | VueX | HTML5 | CSS3
* Back : Express | Node.js | MySQL

## Commandes

⚠️ Suivez les étapes dans cet ordre afin de pouvoir faire fonctionner facilement l'application : 
* ```git clone https://github.com/scheuerkev/KevinScheuer_7_11092021.git```
* ```cd backend```

### Back-end

* Depuis ce dossier ```backend/``` lancez ```npm install```pour installer les dépendances du projet.
* Créez un fichier ```.env``` à la racine du dossier ```backend/``` et ajoutez-y les informations suivantes (sans chevrons) : 
<br>
>DB_NAME=groupomania <br>
>DB_USER=<votre nom d'administrateur mysql> <br>
>DB_PWD=<votre mot de passe d'administrateur mysql> <br>
>TOKEN_KEY=<Votre clé token secrète>
* Lancez le serveur backend ```npm run start```. Par défaut, le serveur se lance sur le port 3000.
### Base de données

* Importez le script fourni à la racine du repository pour installer la base de données et les tables dans MySQL. 
Vous pouvez réaliser cet import grâce à phpMyAdmin ou en ligne de commande grâce à la commande <br> ```SOURCE : <chemin/vers/le/script/SQL>``` de MySQL.
* Un compte admin existe en base de donnée afin de pouvoir tester l'application. Il s'agit du compte répondant aux identifiants : email : admin@groupomania.fr / mdp : Admin100!

### Front-end
* Depuis le dossier ```frontend/``` lancez ```npm install```pour installer les dépendances du projet.
* Lancez le build de l'application ```npm run serve```. Après le build, vous pouvez accéder à l'application sur ```http://localhost:8080/```

## Auteur
🦊 **Kévin Scheuer**

* Twitter: [@scheuerkev](https://twitter.com/scheuerkev)
* Github: [@scheuerkev](https://github.com/scheuerkev)
* LinkedIn: [@Kévin Scheuer](https://linkedin.com/in/kévin-scheuer-078b1510b/)


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_