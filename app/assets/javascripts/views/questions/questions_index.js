Explora.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this._subviews = [];
  },

  addIndexItems: function() {
    var $questionIndex = this.$('.question-index');

    this.collection.each(function(question) {
      var view = new Explora.Views.QuestionsIndexItem({model: question});
      $questionIndex.append(view.render().$el);
      this._subviews.push(view);
    }, this);
  },

  addForm: function() {
    var view = new Explora.Views.QuestionForm({
      collection: this.collection,
      model: new Explora.Models.Question(),
    });

    this.$('.question-form').html(view.render().$el);
    this._form = view;
  },

  removeSubviews: function() {
    this._subviews.forEach(function(subview) {
      subview.remove();
    });
    this._subviews = [];

    if (this._form) {
      this._form.remove();
    }
    this._form = null;
  },

  remove: function() {
    this.removeSubviews();
    Backbone.View.prototype.remove.call(this);
  },

  render: function() {
    this.removeSubviews();

    var content = this.template({questions: this.collection});
    this.$el.html(content);

    this.addIndexItems();
    this.addForm();
    
    return this;
  },
});
