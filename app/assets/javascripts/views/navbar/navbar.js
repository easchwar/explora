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

  addTypeahead: function() {
    this.$('.typeahead').typeahead({
      minLength: 2,
      highlight: true,
    },
    {
      name: 'my-dataset',
      source: this.typeaheadSource
    });
  },

  typeaheadSource: function(query, process) {
    console.log('typeahead');
    $.ajax({
      url: '/api/tags',
      dataType: 'json',
      data: {search: query},
      success: function(data) {
        var names = _.map(data, function(object) {
          return {value: object.tag_name};
        });
        return process(names);
      }
    });
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.addTypeahead();
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
