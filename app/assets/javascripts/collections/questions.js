Explora.Collections.Questions = Backbone.Collection.extend({
  url: '/api/questions',
  model: Explora.Models.Question,

  comparator: function(model) {
    var date = new Date(model.get('created_at'));
    return ( 0 - date.valueOf());
  },

  getOrFetch: function(id) {
    var question;
    if (this.get(id)) {
      question = this.get(id);
    } else {
      question = new Explora.Models.Question({id: id});
    }
    question.fetch({
      success: function(model) {
        this.add(model);
      }.bind(this)
    });

    return question;
  }
});
