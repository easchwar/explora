Explora.Models.Question = Backbone.Model.extend({
  urlRoot: '/api/questions',


  answers: function() {
    if (!this._answers) {
      this._answers = new Explora.Collections.Answers([], {question: this});
    }
    return this._answers;
  },

  parse: function(payload) {
    if (payload.answers) {
      this.answers().set(payload.answers, {parse: true});
      delete payload.answers;

      this.answers().forEach(function(answer) {
        answer._question = this;
      }.bind(this));
    }
    return payload;
  },
});
