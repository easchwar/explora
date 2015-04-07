Explora.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "questionsIndex",
    "questions/:id": "questionShow",
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;

    this._questions = new Explora.Collections.Questions();
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
