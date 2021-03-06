
"use strict";

// all our framework will be hold in this variable.
var ulysse = {};

// will contains all services defined by our library
ulysse.services = {};

/*
 ========================================
 DEPENDENCY INJECTOR
 Instanciate a service with dependencies
 ========================================
 */

ulysse.getService = function(name) {
  var dependenciesList = ulysse.services[name].dependencies;
  var dependencies = [];
  for (var i = 0; i < dependenciesList.length; i++) {
    dependencies[dependenciesList[i]] = ulysse.getService(dependenciesList[i]);
  }
  return new ulysse.services[name].init(dependencies);
};


/**
 * SERVICES
 *
 * A service MUST contain the following keys :
 * - dependencies : array of services name required by this service
 * - init : service constructor function
 */
/*
 =========================
 HTTP SERVICE
 create http requests
 =========================
 */

ulysse.services.http = {};

ulysse.services.http.dependencies = [];

ulysse.services.http.init = function() {

  this.get = function(url, successCallback) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function() {
      if (request.readyState < 4) {
        return false;
      }
      if (request.status !== 200) {
        return false;
      }
      if (request.readyState === 4) {
        successCallback(request.responseText);
      }
    };
    request.send();
  };

};


/*
 =========================
 ATOMS SERVICE
 =========================
 */

ulysse.services.atoms = {};

ulysse.services.atoms.dependencies = ['http'];

ulysse.services.atoms.init = function(dependencies) {

  this.http = dependencies.http;

  this.components = {};

  this.addAtom = function(component) {
    if (typeof component.id === 'undefined') {
      throw "Id of componend is undefined. All components needs an 'id' property to be rendered.";
    }
    this.components[component.id] = component;
    return this;
  };

  this.renderAtom = function(id) {

    var component = this.components[id];
    var element = document.querySelector(component.querySelector);


    // if we find html tag
    if (element) {
      // render the template
      if (typeof component.template !== 'undefined') {

        this.http.get(component.template, function(response) {
          var controllerResponse = component.controller();
          element.innerHTML = response;
        });

      }
      // or simply return controller result
      else {
        element.innerHTML = component.controller();
      }
    }
  };

  this.renderAtomsByPath = function(path) {
    for (var id in this.components) {
      if (this.components[id].url === path) {
        this.renderAtom(id);
      }
    }
  };

  /**
   * Extract current path from url. Example : for
   * "http://localhost/jsUlysse/#/hello-world" path is "/hello-world"
   * @returns {string|string}
   */
  this.getCurrentPath = function() {
    return location.hash.slice(1) || '/';
  };

  this.listenUrlChanges = function() {
    var that = this;
    window.addEventListener("hashchange", function() {
      var currentPath = that.getCurrentPath();
      that.renderAtomsByPath(currentPath);
    });

    // execute route on page load.
    window.addEventListener("load", function() {
      var currentPath = that.getCurrentPath();
      that.renderAtomsByPath(currentPath);
    });

  };

  this.listenUrlChanges();

};
