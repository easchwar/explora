Explora.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],

  initialize: function() {
    this.addAllItems();
    this.addForm();

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addIndexItem);
  },

  addIndexItem: function(question) {
    var view = new Explora.Views.QuestionsIndexItem({model: question});
    this.addSubview('.question-index', view);
  },

  addAllItems: function() {
    this.collection.each(function(question) {
      this.addIndexItem(question);
      // var view = new Explora.Views.QuestionsIndexItem({model: question});
      // this.addSubview('.question-index', view);
    }, this);
  },

  addForm: function() {
    var view = new Explora.Views.QuestionForm({
      collection: this.collection,
      model: new Explora.Models.Question(),
    });
    this.addSubview('.question-form', view);
    // this.$('.question-form').html(view.render().$el);
    // this._form = view;
  },

  render: function() {
    console.log(this.subviews());
    // console.log(this.$el.html());
    var content = this.template({questions: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
