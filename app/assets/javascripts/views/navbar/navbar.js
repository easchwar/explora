Explora.Views.Navbar = Backbone.View.extend({
  template: JST['navbar/navbar'],

  events: {
    'click .sign-out': 'signOut',
    'submit form': 'search',
  },

  initialize: function(options) {
    this.router = options.router;
    this.listenTo(this.router, 'route', this.routeAction);
  },

  routeAction: function() {
    this.$('input').val('');
  },

  addTypeahead: function() {
    this.$('.typeahead').typeahead({
      minLength: 1,
      highlight: true,
    },
    {
      name: 'my-dataset',
      source: this.typeaheadSource
    });
    this.$('.tt-input').css('background-color', 'white');
  },

  typeaheadSource: function(query, process) {
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
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON();

    $.ajax({
      url: '/api/tags/find',
      type: 'GET',
      dataType: 'json',
      data: formData,
      success: function(tag) {
        $form.children('input').val('');
        $('.typeahead').typeahead('close');
        Backbone.history.navigate('/tags/' + tag.id + '/questions', {trigger: true});
      },
    });
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
