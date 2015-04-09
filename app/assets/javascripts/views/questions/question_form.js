Explora.Views.QuestionForm = Backbone.View.extend({
  template: JST['questions/form'],

  tagName: 'form',

  events: {
    'submit': 'submit'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var question = new Explora.Models.Question(this.$el.serializeJSON());
    question.save({}, {
      success: function(model) {
        this.$('textarea').val('');
        this.collection.add(model);
      }.bind(this)
    });

  },
});
