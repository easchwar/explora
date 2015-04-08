Explora.Views.DashboardShow = Backbone.CompositeView.extend({
  template: JST['dashboard/show'],

  className: 'row',

  initialize: function() {
    // set up subviews
    this.addForm();
    this.addQuestionsIndex();
    this.addTagsIndex();

    this.listenTo(this.collection, 'sync', this.render);
  },

  addForm: function() {
    var view = new Explora.Views.QuestionForm({
      collection: this.collection,
      model: new Explora.Models.Question(),
    });
    this.addSubview('.question-form', view);
  },

  addQuestionsIndex: function() {
    var view = new Explora.Views.QuestionsIndex({collection: this.collection});
    this.addSubview('.questions-index', view);
  },

  addTagsIndex: function() {

  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
