window.Explora = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // alert('Hello from Backbone!');
    var $rootEl = $('#main');
    var $sidebar = $('#sidebar');
    var $navbar = $('#navbar');
    this.router = new Explora.Routers.Router({
      $rootEl: $rootEl,
      $sidebar: $sidebar,
      $navbar: $navbar,
    });

    var navView = new Explora.Views.Navbar({router: this.router});
    $navbar.html(navView.render().$el);

    Backbone.history.start();
  }
};
