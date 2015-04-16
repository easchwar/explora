Explora.Views.AnswerForm = Backbone.View.extend({
  template: JST['answers/form'],

  tagName: 'form',

  events: {
    'submit': 'submit',
  },

  initialize: function(options) {
    this.question = options.question;
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var answerData = this.$el.serializeJSON();
    answerData.question_id = this.question.id;

    var answer = new Explora.Models.Answer(answerData);
    answer.save({}, {
      success: function(model) {
        this.$('textarea').val('');
        this.collection.add(model);
        Backbone.history.navigate('/questions/' + this.question.id, {trigger: true});
      }.bind(this)
    });
  },
});
