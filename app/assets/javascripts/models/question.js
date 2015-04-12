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
      this._tags = new Explora.Collections.Tags();
    }
    return this._tags;
  },

  relatedQuestions: function() {
    if (!this._relatedQuestions) {
      this._relatedQuestions = new Explora.Collections.Questions();
    }
    return this._relatedQuestions;
  },

  topAnswer: function() {
    if (!this._topAnswer) {
      this._topAnswer = new Explora.Models.Answer();
    }
    return this._topAnswer;
  },

  parse: function(payload) {
    if (payload.answers) {
      this.answers().set(payload.answers, {parse: true});
      delete payload.answers;

      this.answers().forEach(function(answer) {
        answer._question = this;
      }.bind(this));
    }

    if (payload.related_questions) {
      this.relatedQuestions().set(payload.related_questions);
      delete payload.related_questions;
    }

    if (payload.tags) {
      this.tags().set(payload.tags, {parse: true});
      delete payload.tags;
    }

    if (payload.top_answer) {
      this.topAnswer().set(payload.top_answer, {parse: true});
      delete payload.top_answer;
    }

    return payload;
  },
});
