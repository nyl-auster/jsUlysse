
"use strict";

var ulysse = {

  components: {},

  addAtom: function(component) {
    if (typeof component.id === 'undefined') {
      throw "Id of componend is undefined. All components needs an 'id' property to be rendered.";
    }
    this.components[component.id] = component;
    return this;
  },

  renderAtom: function(id) {

    var component = this.components[id];
    var element = document.getElementById(component.htmlId);

    // if we find html tag
    if (element) {
      // render the template
      if (typeof component.template !== 'undefined') {

        this.ajaxGet(component.template, function(response) {
          var controllerResponse = component.controller();
          element.innerHTML = response;
        });

      }
      // or simply return controller result
      else {
        element.innerHTML = component.controller();
      }
    }
  },

  /**
   * Get url content by http get
   *
   * @param url
   * @param successCallback
   */
   ajaxGet: function(url, successCallback) {
    
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
  },

  renderAtomsByPath: function(path) {
    for (var id in this.components) {
      if (this.components[id].url === path) {
        this.renderAtom(id);
      }
    }
  },

  /**
   * Extract current path from url. Example : for
   * "http://localhost/jsUlysse/#/hello-world" path is "/hello-world"
   * @returns {string|string}
   */
  getCurrentPath: function() {
    return location.hash.slice(1) || '/';
  },

  listenUrlChanges: function() {

    var that = this;

    //console.log("listening");

    // execute route on hash change.

    window.addEventListener("hashchange", function() {
      var currentPath = that.getCurrentPath();
      that.renderAtomsByPath(currentPath);
    });

    // execute route on page load.
    window.addEventListener("load", function() {
      var currentPath = that.getCurrentPath();
      that.renderAtomsByPath(currentPath);
    });

  }

};

ulysse.listenUrlChanges();
