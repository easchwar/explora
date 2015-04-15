Explora.Views.FeedShow = Backbone.CompositeView.extend({
  template: JST['feed/show'],

  className: 'row',

  initialize: function(options) {
    this.tags = options.tags;
    this.questions = options.questions;

    // if viewing a single tag's feed
    this.tag = options.tag;

    // set up subviews
    this.addForm();
    this.addQuestionsIndex();

    if (this.tag) {
      this.addTagHeader(this.tag);
    }

    this.listenTo(this.questions, 'sync', this.render);
  },

  addForm: function() {
    var view = new Explora.Views.QuestionFormModal({
      collection: this.questions,
      tags: this.tags,
    });
    this.addSubview('.question-form', view);
  },

  addQuestionsIndex: function() {
    var view = new Explora.Views.QuestionsIndex({collection: this.questions});
    this.addSubview('.questions-index', view);
  },

  addTagHeader: function(tag) {
    var view = new Explora.Views.TagHeader({model: tag});
    this.addSubview('.tag-header', view);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
