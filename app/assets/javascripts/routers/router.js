Explora.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "dashboardShow",
    "questions/tags/:id": "taggedQuestionIndex",
    "questions/:id": "questionShow",
  },

  initialize: function(options) {
    this.$sidebar = options.$sidebar;
    this.$rootEl = options.$rootEl;

    this._questions = new Explora.Collections.Questions();
    this._questions.url = '/api/questions/feed';
    this._tags = new Explora.Collections.Tags();

    this._defaultSidebar = new Explora.Views.DefaultSidebar({tags: this._tags});
    this.swapSidebar(this._defaultSidebar);
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

  questionShow: function(id) {
    // var question = this._questions.getOrFetch(id);
    var question = new Explora.Models.Question({id: id});
    question.fetch();
    var view = new Explora.Views.QuestionShow({model: question});

    this.swapView(view);
  },

  swapSidebar: function(view) {
    if (this._currentSidebar === view) {
      return;
    }

    if (this._currentSidebar) {
      this._currentSidebar.remove();
    }
    this._currentSidebar = view;
    this.$sidebar.html(view.render().$el);
  },

  swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

});
