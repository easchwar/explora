Explora.Views.DashboardShow = Backbone.CompositeView.extend({
  template: JST['dashboard/show'],

  className: 'row',

  initialize: function(options) {
    this.tags = options.tags;
    this.questions = options.questions;

    // set up subviews
    this.addForm();
    this.addQuestionsIndex();
    this.addTagsIndex();

    this.listenTo(this.questions, 'sync', this.render);
    this.listenTo(this.tags, 'change:tag_name add remove', this.render);
  },

  addForm: function() {
    var view = new Explora.Views.QuestionForm({
      collection: this.collection,
      model: new Explora.Models.Question(),
    });
    this.addSubview('.question-form', view);
  },

  addQuestionsIndex: function() {
    var view = new Explora.Views.QuestionsIndex({collection: this.questions});
    this.addSubview('.questions-index', view);
  },

  addTagsIndex: function() {
    var view = new Explora.Views.TagsIndex({collection: this.tags});
    this.addSubview('.tags-index', view);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
