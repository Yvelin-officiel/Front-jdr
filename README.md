# Front-jdr
Ne pas oublier d'installer les node_modules avec npm install

### Application SPA avec navigation entre 3 composant :
- La fiche personnage
- Les équipements
- Les sorts

Toute les entrées sont volontairement laissé modifiable pour laisser un minimum de liberté

Les appels api les plus gros ne sont fait qu'un fois, les reponses sont stockés dans des objets via un service pour ne pas tout regénérer lors de la navigation.

### Certains points qui n'ont pas pu être ajouter (manque de temps)
- Le design (actuellement un peu moche)
- Permettre à l'utilisateur de sélectionner des objets et de se faire un panier avec une bourse de départ vu que les objets ont un prix
- Permettre de sélectionner des sorts, limitant en nombre par exemple
