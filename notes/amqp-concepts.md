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
