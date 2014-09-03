Template.slidePanel.created = function() {
  slidePanel.slidePanelTemp = this;
}
Template.slidePanel.rendered = function() {
  slidePanel.inserted = true;
}
Template.slidePanel.destroyed = function() {
  slidePanel.remove();
}
Template.slidePanel.helpers({
  dynamicTemp: function() {
    return slidePanel.template()
  },
  dynamicData: function() {
    return slidePanel.data()
  }
});
Template.slidePanel.events({
  'click .close-panel': function() {
    slidePanel.closePanel();
  }                                                                                                     // 25
}); 