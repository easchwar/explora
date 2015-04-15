Explora.Collections.Tags = Backbone.Collection.extend({
  url: 'api/tags',
  model: Explora.Models.Tag,

  comparator: 'tag_name',

  getOrFetch: function(id) {
    var tag;
    if (this.get(id)) {
      tag = this.get(id);
    } else {
      tag = new Explora.Models.Tag({id: id});
    }
    tag.fetch({
      success: function(model) {
        this.add(model);
      }.bind(this)
    });

    return tag;
  },

});
