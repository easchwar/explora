Explora.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "feedShow",
    "questions/all": "allQuestionsIndex",
    "tags/:id/questions": "taggedQuestionsIndex",
    "questions/:id": "questionShow",
  },

  initialize: function(options) {
    this.$sidebar = options.$sidebar;
    this.$rootEl = options.$rootEl;

    this._questions = new Explora.Collections.Questions();
    this._tags = new Explora.Collections.Tags();
    this._tags.fetch();

    this._userTags = new Explora.Collections.Tags();
    this._userTags.fetch({
      data: {user_id: CURRENT_USER.id},
    });

    this._defaultSidebar = new Explora.Views.DefaultSidebar({tags: this._userTags});
    this.swapSidebar(this._defaultSidebar);
  },

  allQuestionsIndex: function() {
    this._questions.fetch();

    var view = new Explora.Views.FeedShow({
      questions: this._questions,
      tags: this._tags,
    });
    this.swapView(view);
  },

  feedShow: function() {
    var feedQuestions = new Explora.Collections.Questions();
    feedQuestions.url = '/api/questions/feed';
    feedQuestions.fetch();

    var view = new Explora.Views.FeedShow({
      questions: feedQuestions,
      tags: this._tags,
      });
    this.swapView(view);
  },

  questionShow: function(id) {
    var question = this._questions.getOrFetch(id);
    var view = new Explora.Views.QuestionShow({model: question});

    this.swapView(view);
  },

  taggedQuestionsIndex: function(id) {
    var tag = this._tags.getOrFetch(id);

    var tagQuestions = new Explora.Collections.Questions();
    tagQuestions.fetch({
      data: {
        tag_id: id,
      },
    });

    var view = new Explora.Views.FeedShow({
      questions: tagQuestions,
      tags: this._tags,
      tag: tag,
    });
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
    this.$rootEl.html(view.$el);
    view.render();
  },

});
