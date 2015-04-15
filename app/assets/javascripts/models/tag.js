Explora.Models.Tag = Backbone.Model.extend({
  urlRoot: 'api/tags',


  parse: function(payload) {
    if (payload.subscription) {
      this.subscription().set(payload.subscription, {parse: true});
      delete payload.subscription;
    }
    return payload;
  },

  subscription: function() {
    if (!this._subscription) {
      this._subscription = new Explora.Models.Subscription();
    }
    return this._subscription;
  },

});
