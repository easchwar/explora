window.Explora = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // alert('Hello from Backbone!');
    var $rootEl = $('#main');
    new Explora.Routers.Router({$rootEl: $rootEl});
    Backbone.history.start();
  }
};
