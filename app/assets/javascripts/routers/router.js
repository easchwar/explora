Explora.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "dashboardShow",
    "questions/:id": "questionShow",
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;

    this._questions = new Explora.Collections.Questions();
    this._tags = new Explora.Collections.Tags();
  },

  dashboardShow: function() {
    this._questions.fetch();
    this._tags.fetch();

    var view = new Explora.Views.DashboardShow({
      questions: this._questions,
      tags: this._tags,
      });
    this.swapView(view);
  },

  questionsIndex: function() {
    this._questions.fetch();
    var view = new Explora.Views.QuestionsIndex({collection: this._questions});

    this.swapView(view);
  },

  questionShow: function(id) {
    var question = this._questions.getOrFetch(id);
    var view = new Explora.Views.QuestionShow({model: question});

    this.swapView(view);
  },

  swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
      this._currentView = view;
      this.$rootEl.html(view.render().$el);
  },

});
