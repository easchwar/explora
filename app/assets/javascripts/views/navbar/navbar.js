Explora.Views.Navbar = Backbone.View.extend({
  template: JST['navbar/navbar'],

  events: {
    'click .sign-out': 'signOut',
    'submit form': 'search',
  },

  initialize: function(options) {
    this.router = options.router;
    this.listenTo(this.router, 'route', this.logRoute);
  },

  logRoute: function() {
    console.log('Routed');
    console.log(arguments);
    this.$('input').val('');
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  search: function(event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    console.log($form);
    console.log($form.serializeJSON());
  },

  signOut: function(event) {
    event.preventDefault();

    $.ajax({
      url: '/session',
      method: 'DELETE',
      success: function() {

        window.location = "/";
      }
    });
  },

});
