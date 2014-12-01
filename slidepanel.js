SlidePanel = function() {
  if (! (this instanceof SlidePanel)) {
    return new SlidePanel(options);
  }

  this.slidePanelTemp = null;
  this.clearTimeout = null;
  this.inserted = false;
  this.removed = false;
  this.fixScrollPosition = true;
  this._lastScrollTop = 0;

  this._inView = false;

  this._onClose = [];

  this._overlay = new ReactiveVar(false);
  this._template = new ReactiveVar(null);
  this._data = new ReactiveVar({});
}

SlidePanel.prototype.template = function(template) {
  if ( template !== undefined ) {
    return this._template.set(template);
  } else {
    return this._template.get();
  }
}

SlidePanel.prototype.data = function(data) {
  if ( data !== undefined && typeof data === 'object' ) {
    return this._data.set(data);
  } else {
    return this._data.get();
  }
}

SlidePanel.prototype.overlay = function(overlay) {
  if ( overlay !== undefined ) {
    return this._overlay.set(overlay);
  } else {
    return this._overlay.get();
  }
}

SlidePanel.prototype.onClose = function(onCloseFunc) {
  if ( onCloseFunc && typeof onCloseFunc === 'function' ) {
    this._onClose.push(onCloseFunc);
  } else {
    return this._onClose;
  }
}

SlidePanel.prototype.showPanel = function(template, data) {
  if ( !this.inserted || this.removed ) {
    return false;
  }

  if ( this._inView ) {
    this.closePanel();
  }

  if ( this.clearTimeout ) {
    Meteor.clearTimeout(this.clearTimeout);
    this.clearTimeout = null;
  }

  this.template(template);
  this.data(data);

  Meteor.setTimeout(this.slideIn.bind(this), 150);
}

SlidePanel.prototype.closePanel = function() {
  this.slideOut();

  this.onClose().forEach(function(func) {
    Tracker.afterFlush(func);
  });
  this._onClose = [];

  this.clearTimeout = Meteor.setTimeout(function() {
    this.template(null);
    this.data(null);
  }.bind(this), 150);
}

SlidePanel.prototype.slideIn = function() {
  this.slidePanelTemp.$('.slide-panel, .slide-panel-overlay').addClass('slide-in');
  if ( this.fixScrollPosition ) {
    this._lastScrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }
  this._inView = true;
}

SlidePanel.prototype.slideOut = function() {
  this.slidePanelTemp.$('.slide-panel, .slide-panel-overlay').removeClass('slide-in');
  if ( this.fixScrollPosition && this._lastScrollTop ) {
    document.documentElement.scrollTop = document.body.scrollTop = this._lastScrollTop;
  }
  this._inView = false;
}

SlidePanel.prototype.remove = function() {
  this._currentTemplate = null;
  this._currentData = null;
  this._overlay = null;
  this.removed = true;
}

slidePanel = new SlidePanel();