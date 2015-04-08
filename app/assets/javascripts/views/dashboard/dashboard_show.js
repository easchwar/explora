Explora.Views.DashboardShow = Backbone.View.extend({
  template: JST['dashboard/show'],

  className: 'row',

  initialize: function() {

  },

  addForm: function() {
    var view = new Explora.Views.QuestionForm({
      collection: this.collection,
      model: new Explora.Models.Question(),
    });

    this.$('.question-form').html(view.render().$el);
    this._form = view;
  },

  addQuestionsIndex: function() {

  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
});
