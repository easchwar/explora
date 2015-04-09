Explora.Models.Question = Backbone.Model.extend({
  urlRoot: '/api/questions',


  answers: function() {
    if (!this._answers) {
      this._answers = new Explora.Collections.Answers([], {question: this});
    }
    return this._answers;
  },

  tags: function() {
    if (!this._tags) {
      this._tags = new Explora.Collections.Tags([], {question: this});
    }
    return this._tags;
  },

  parse: function(payload) {
    if (payload.answers) {
      this.answers().set(payload.answers, {parse: true});
      delete payload.answers;

      this.answers().forEach(function(answer) {
        answer._question = this;
      }.bind(this));
    }

    if (payload.tags) {
      this.tags().set(payload.tags, {parse: true});
      delete payload.tags;
    }

    return payload;
  },
});
