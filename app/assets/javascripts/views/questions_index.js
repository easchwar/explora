Explora.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],

  render: function() {
    var content = this.template({questions: this.collection});
    this.$el.html(content);
    return this;
  },
});
