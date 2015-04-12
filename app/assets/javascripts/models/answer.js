Explora.Models.Answer = Backbone.Model.extend({
  urlRoot: '/api/answers',

  initialize: function(options) {
    this.question = options.question;
  },
});
