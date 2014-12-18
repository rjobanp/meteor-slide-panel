Template.slidePanel.created = function() {
  slidePanel.slidePanelTemp = this;
}
Template.slidePanel.rendered = function() {
  slidePanel.inserted = true;
}
Template.slidePanel.destroyed = function() {
  slidePanel.inserted = false;
}
Template.slidePanel.helpers({
  dynamicTemp: function() {
    return slidePanel.template();
  },
  dynamicData: function() {
    return slidePanel.data();
  },
  overlay: function() {
    return slidePanel.overlay();
  }
});
Template.slidePanel.events({
  'click .close-panel, click .slide-panel-overlay': function() {
    slidePanel.closePanel();
  }
});