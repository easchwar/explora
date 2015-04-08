Explora.Views.QuestionShow = Backbone.View.extend({
  template: JST['questions/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({question: this.model});
    this.$el.html(content);
    return this;
  },
});
