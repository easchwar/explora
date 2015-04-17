Explora.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "feedShow",
    "users/:id": "userShow",
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

  defaultSidebar: function() {
    var view = new Explora.Views.DefaultSidebar({tags: this._userTags});
    return view;
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

  userShow: function(id) {
    var deleteable = (CURRENT_USER.id == id);
    var user = new Explora.Models.User({id: id});
    user.fetch();
    var userQuestions = new Explora.Collections.Questions();
    userQuestions.fetch({
      data: {author_id: id}
    });
    var userTags = new Explora.Collections.Tags();
    userTags.fetch({
      data: {user_id: id}
    });

    var view = new Explora.Views.FeedShow({
      questions: userQuestions,
      tags: this._tags,
    });

    var sidebarView = new Explora.Views.UserSidebar({
      model: user,
      tags: userTags,
      deleteable: deleteable,
    });
    this.swapView(view, sidebarView);
  },

  swapSidebar: function(view) {
    if (this._currentSidebar === view) {
      return;
    }

    if (this._currentSidebar) {
      this._currentSidebar.remove();
    }
    this._currentSidebar = view;
    this.$sidebar.html(view.$el);
    view.render();
    view.delegateEvents();
  },

  swapView: function(view, sidebarView) {
    sidebarView = sidebarView || this.defaultSidebar();
    this.swapSidebar(sidebarView);

    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  },

});
