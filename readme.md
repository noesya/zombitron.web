# Zombitron version WEB

Zombitron a plusieurs interfaces constuites à partir de téléphones obsoletes: 
- [Zombitronica](https://github.com/noesya/zombitronica) > un instrument de musique

Vous pouvez cloner le code correspondant en allant directement sur les repos associés. 

Ce repo est une base de tests pour constuire son propre zombitron. 

Il vous faudra un ou plusieurs téléphones pourvus d'un navigateur avec accès wifi.

# Mode d'emploi
## Pour executer le serveur node js depuis son ordinateur
1. Cloner le repo
  ```
  git clone https://github.com/noesya/zombitron
  ```
2. Rentrer dans le dossier, installer les dépendances
  ```
  cd zombitron
  npm install
  ```

3. Cas particulier pour un serveur https (permettant d'utiliser des données de capteurs natifs des téléphones)
Generer un certificat  https: 
`sudo openssl req -x509 -nodes -days 364 -newkey rsa:4096 -keyout selfsigned.key -out selfsigned.crt`
à placer à la racine du code. 

Il faut changer le mode de permission des fichiers générés : 
```
  sudo chmod 755 selfsigned.crt
  sudo chmod 755 selfsigned.key
```

IPHONE 
Parfois : il faut activer la motion dans les parametres du telephone > safari

4. Lancer le serveur
  ```
  npm run zombitron
  ``` 

## Pour executer le serveur node sur un Android
Avant l'étape 1 : 
- Choisir un vieil Android pour le transformer en serveur-zombitron.
- Installer [Termux](https://play.google.com/store/apps/details?id=com.termux) sur l'appareil
- Lancer Termux et installer node, git et yarn
  ```
  pkg install nodejs git yarn
  ```
- Retourner à 1. 

## Une fois le serveur démarré
Rendez-vous à l'adresse https://[ZOMBITRONIP:PORT]/ avec un telephone ou un ordinateur
et https://[ZOMBITRONIP:PORT]/controller avec un telephone

### Cas particulier du https
Pour autoriser l'accès à certains capteurs 

## Mise à jour

Pour avoir la dernière version du code, lancer `git pull` dans le répertoire du projet, puis relancer le serveur.

## Pour se connecter depuis son ordi au zombitron serveur

### Setup serveur

1. Installer OpenSSH
  ```
  pkg install openssh
  ```
2. Lancer le serveur SSH
  ```
  sshd
  ```
3. Configurer le mot de passe utilisateur avec la commande `passwd`.

### Connexion client

Dans un terminal : `ssh [ZOMBITRON_SERVEUR_IP] -p 8022` et entrer le mot de passe.
s