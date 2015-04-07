Explora.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "questionsIndex",
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  questionsIndex: function() {

  },
});
