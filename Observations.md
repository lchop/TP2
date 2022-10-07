# Retour sur ton TP

## Strcture du projet
Ta structure d'application Express est bonne dans l'ensemble. Tu aurais pu mettre ton fichier "UserModel.js" dans un dossier "Models" pour reprendre la structure MVC. Le dossier "Data" et le fichier "data.js" ne sont pas nécessaire, car on utilise une base de données et non des données locales.

Le fichier ".env" est conforme à la demande de l'énoncé.

## UserModel
La définition du schéma et du modèle User sont conformes comme vu en cours.

## Application Express
L'application Express est conforme. On retrouve les différentes initialisations nécessaires au bon fonctionnement de l'app.

1) Concernant la page register, il était demandé de créer une page pour l'inscription et une page pour la connexion. Dans ton TP, tu as mis les deux formulaires sur la page d'accueil. La vérification des champs ne répond pas aux critères de l'énoncé, car tu as utilisé l'attribut HTML "required". Les messages d'erreurs personnalisés ne peuvent pas être affichés. En retirant les "required", l'ajout d'un utilisateur vide (formulaire vide) est possible.

Sinon, la vérification du mot de passe ainsi que la vérification de l'existence d'un utilisateur dans la base de données sont bien en place.

2) Concernant la page "login", son fonctionnement est conforme.

3) Concernant la page "dashboard", cette dernière est fonctionnelle et le middleware est bien présent. Ce dernier aurait pu être amélioré en intégrant la gestion d'un JSON Web Token (JWT).

## Les messages falsh
Ils sont bien présents et fonctionnels.

## Remarque
Bon travail dans l'ensemble.
Pour améliorer ton code, tu peux faire la connexion à MongoDB uniquement dans le fichier "server.js" comme vu lors des corrections sur les exercices. Dans ta configuration, tu effectues une connexion dans deux controllers.

# Note : 15/20
