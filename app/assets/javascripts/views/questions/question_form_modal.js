Explora.Views.QuestionFormModal = Backbone.CompositeView.extend({
  template: JST['questions/form_modal'],

  tagName: 'div',

  events: {
    'submit': 'suppress',
    'click .modal-show': 'setupInputFocus',
    'click .form-submit': 'submit',
    'hidden.bs.modal': 'clearValues',
  },

  initialize: function() {
    this.addTagForm();
    this.addTagsIndex();
  },

  addTagForm: function() {
    var view = new Explora.Views.TagSearchFormQuestionForm({
      collection: this.model.tags()
    });
    this.addSubview('.tag-search-form', view);
  },

  addTagsIndex: function() {
    var view = new Explora.Views.TagsIndexQuestionForm({collection: this.model.tags()});
    this.addSubview('.tags-index', view);
  },

  clearValues: function(event) {
    this.$('textarea').val('');
    this.model.tags().reset([]);
  },

  render: function() {
    var content = this.template({tags: this.tags});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  setupInputFocus: function(event) {
    $('#questionFormModal').one('shown.bs.modal', function () {
      $('.body-input').focus();
    });
  },

  submit: function(event) {
    event.preventDefault();
    var formData = this.$('.question-form').serializeJSON();
    this.model.save(formData, {
      success: function(model) {
        this.$('textarea').val('');
        this.$('#questionFormModal').modal('hide');

        $('#questionFormModal').one('hidden.bs.modal', function() {
          this.collection.add(model);
          Backbone.history.navigate('/questions/' + model.id, {trigger: true});
        }.bind(this));
      }.bind(this)
    });
  },

  suppress: function(event) {
    event.preventDefault();
  },
});
