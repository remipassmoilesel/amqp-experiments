# AMQPLib

Travail en cours.

## Notes sur AMQP

Documentation: http://www.squaremobius.net/amqp.node/

Faut il fermer la connexion au moment de quitter le processus ? Ce code apprait sur certains exemples, mais pas tous.
    
    process.once('SIGINT', function() { conn.close(); });

## TODO

- détailler le protocol AMQP
- essayer les wildcards
- essayer publish avec identifiants hiérarchiques

Voir les fonctions: 
- channel.sendToQueue()
- channel.publish()


