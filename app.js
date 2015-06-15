"use strict";

var atoms = new ulysse.getService('atoms');

atoms

  .addAtom({
    url : '/',
    querySelector: "ulysse-view#main-view",
    id: "homepage",
    controller: function() {
      return "Je suis un composant de la page d'accueil";
    }
  })

  .addAtom({
    url: '/hello-world',
    querySelector: "ulysse-view#main-view",
    id: 'helloWorld',
    controller: function() {
      return "";
    },
    template: 'templates/hello-world.html'
  })

  .addAtom({
    url : '/sub-view-1',
    querySelector: "ulysse-view#sub-view",
    id: "helloworld-subview-1",
    controller: function() {
      return "Je suis une sous vue de la page hello world";
    }
  })

  .addAtom({
    url : '/sub-view-2',
    querySelector: "ulysse-view#sub-view",
    id: "helloworld-subview-2",
    controller: function() {
      return "je suis une autre sous-vue de la page hello world";
    }
  });




