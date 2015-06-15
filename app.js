"use strict";

ulysse

  .addAtom({
    url : '/',
    id: "homepage",
    htmlId: "main-view",
    controller: function() {
      return "Je suis un composant de la page d'accueil";
    }
  })

  .addAtom({
    url: '/hello-world',
    id: 'helloWorld',
    htmlId: "main-view",
    controller: function() {
      return "";
    },
    template: 'templates/hello-world.html'
  })

  .addAtom({
    url : '/sub-view-&',
    id: "helloworld-subview-1",
    htmlId: "sub-view",
    controller: function() {
      return "Je suis un sous-composant de la page hello world";
    }
  })

  .addAtom({
    url : '/sub-view-2',
    id: "helloworld-subview-2",
    htmlId: "sub-view",
    controller: function() {
      return "sub view 2";
    }
  });




