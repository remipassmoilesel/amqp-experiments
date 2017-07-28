# Concepts AMQP

AMQP communique par TCP.

## Définitions rapides

Channels: Canaux de communication. Plusieurs canaux peuvent être créé/ utilisés par un client.

Exchanges: Echange. Point de dépose d'un message. A partir d'un exchange, un message sera placés dans une ou plusieurs queues de communication.

Queue: Point de consommation d'un message. Un message consommé dans une queue n'est ensuite plus disponible.

Binding: Lien entre un échange et une queue.

Binding key: Identifiant de route. Les routing keys sont comparées aux binding keys pour décider si le message doit être déposé sur une queue ou pas. 

Routing key: Identifiant sous la forme "abcd.efgh.ijkl". Exemple: "france.languedoc.montpellier"

## Types d'échanges

- Mode direct: utilisation des routing key pour s'adresser directement à un bindings (une ou plusieurs queues)
- Topic: 1:N avec utilisations de binding key pour orienter le traffic (utilisation permise de jokers). Permet de diriger des messages à partir de points communs. Exemple: france.languedoc.*
- Fanout: 1:N sans distinctions de binding key. Toutes les queues abonnées à l'échange recevront le message.

## Joker / Wildcards

    *: représente 0 ou plusieurs éléments. Exemples: france.languedoc.*, france.#.montpellier
    #: représente un élément. Exemples: france.languedoc.#, france.#.montpellier, 

## Acquittement / Aknowledgement

Il est possible d'activer l'acquittement des messages.
Si il est désactivé, un consommateur qui plante aura consommé le message, et le message ne sera plus disponible pour personne (la tâche est perdue).
Si il est activé, le consommateur doit acquitter le message à la fin de sa tâche, et le message disparait de la queue. 
Sinon le message sera distribué à un potentiel autre consommateur, ou redistribuer au retour du consommateur.

## Répartition des messages

Il est possible de répartir les messages accumulés sur une queue. Un client peut demander à ne pas recevoir plus de 'n' message.

## Fermeture de connection

Il est préférable de tenter de fermer la connexion avant de quitter, pour éventuellement vider les canaux de comm (flush)
Dans les exemples d'AmqpLib, ce code apprait sur certains exemples:
    
    process.once('SIGINT', function() { conn.close(); });
