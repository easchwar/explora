Explora.Collections.Answers = Backbone.Collection.extend({
  url: '/api/answers',

  comparator: function(model) {
    var date = new Date(model.get('created_at'));
    return date.valueOf();
  },

  model: Explora.Models.Answer,
});
