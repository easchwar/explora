Explora.Views.TagSearchForm = Backbone.View.extend({
  template: JST['tags/search_form'],

  tagName: "form",

  events: {
    'submit': 'search',
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
    var formData = this.$el.serializeJSON();

    $.ajax({
      url: '/api/tags/find',
      type: 'GET',
      dataType: 'json',
      data: formData,
      success: function(tag) {
        this.$('input').val('');
        this.$('.typeahead').typeahead('close');
        this.collection.add(tag);
      }.bind(this),
    });
  },
});
