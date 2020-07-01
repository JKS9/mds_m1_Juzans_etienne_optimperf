Optimisation et performance
===================

### Pré-requis
* Node.js
* Docker
* MongoDB

### Schéma architecture REST API avec un cluster mongoDB Atlas
![alt text](https://github.com/JKS9/mds_m1_Juzans_etienne_optimperf/blob/master/schema_cluster_MongoDB.png)

Un cluster est un ensemble de machine, qui peuvent être par exemple des réplicaSets c'est à dire des réplications de données. Par exemple dans ce schéma vous pouvez voir un primary et deux secondary qui sont des réplications de données de la primary. L'avantage de ce système, c'est d'avoir une sécurité, une sorte de back-up par exemple lorsque que la base de donnée primary tombe, une secondary le remplacera d'aussitôt, cela permet de maintenir une continuité de donnée en toute fiabilité.

### Etape 1 : La configuration du cluster de mongoDB Atlas :
1) Tout d'abord, il faut se créer un compte mongoDB Atlas.
2) Créer un projet.
3) Choisissez le pays pour l'hébergement cloud.
4) Créer votre cluster (réplique simple à 3 noeuds par défaut)
5) Configurer la white list
6) Etablir une connexion.
7) Configurer user + password.
8) Après avoir établie la connexion vous pouvez récupérer l'url ci-dessous et l'intégrer dans votre API REST.

### Etape 2 : Configuration du cluster local avec docker-compose

Exécutez la commande pour exécuter la config du fichier config
```sh
docker-compose up
```

Fichier de configuration docker-compose.yml, ci-dessous.

```bash
version: '3'

services:
  mongo_set_1:
    container_name: mongo_set_1
    image: mongo
    command: mongod --replSet mongo-cluster-dev
    ports:
      - 27018:27017
    networks:
      - mongo-cluster-dev

  mongo_set_2:
    container_name: mongo_set_2
    image: mongo
    command: mongod --replSet mongo-cluster-dev
    ports:
      - 27019:27017
    networks:
      - mongo-cluster-dev

  mongo_set_3:
    container_name: mongo_set_3
    image: mongo
    command: mongod --replSet mongo-cluster-dev
    ports:
      - 27020:27017
    networks:
      - mongo-cluster-dev

networks:
  mongo-cluster-dev:
```

Une fois que les conteneurs instanciée, je vais me connecter au conteneur mongo1

```sh
docker exec -it mongo1 mongo
```
Une fois dans le shell,  je dois définir la configuration pour le lancement du replica set.
```sh
config = {
    _id:"mongo-cluster-dev",
    members:[
        {_id:0, host:"mongo_set_1:27017"},
        {_id:1, host:"mongo_set_2:27017"},
        {_id:2, host:"mongo_set_3:27017"},
    ]
};
```
Puis :
```sh
rs.initiate(config);
```

### Etape 2 : run le projet
 
```sh
cd backend
npm install 
npm start
```