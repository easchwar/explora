Explora.Views.Navbar = Backbone.View.extend({
  template: JST['navbar/navbar'],

  events: {
    'click .sign-out': 'signOut',
    'submit form': 'search',
  },

  initialize: function(options) {
    this.router = options.router;
    this.listenTo(this.router, 'route', this.logRoute);

    // $('.typeahead').typeahead({
    //   minLength: 2,
    //   highlight: true,
    // },
    // {
    //   name: 'my-dataset',
    //   source: this.typeaheadSource
    // });
  },

  logRoute: function() {
    console.log('Routed');
    console.log(arguments);
    this.$('input').val('');
  },

  typaheadSource: function(query, process) {

  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  search: function(event) {
    // event.preventDefault();
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
