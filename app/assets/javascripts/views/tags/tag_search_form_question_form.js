Explora.Views.TagSearchFormQuestionForm = Backbone.View.extend({
  template: JST['tags/search_form_question_form'],

  tagName: 'form',

  events: {
    'submit': 'search',
  },

  initialize: function() {
  },

  render: function() {
    var content = this.template({tags: this.collection});
    this.$el.html(content);
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
