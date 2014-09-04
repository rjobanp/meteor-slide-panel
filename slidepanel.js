SlidePanel = function() {
  if (! (this instanceof SlidePanel)) {
    return new SlidePanel(options);
  }

  this.slidePanelTemp = null;
  this.inserted = false;
  this.removed = false;

  this._inView = false;

  this._onClose = [];

  this._overlay = new Blaze.ReactiveVar(false);
  this._template = new Blaze.ReactiveVar(null);
  this._data = new Blaze.ReactiveVar({});
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

  this.template(template);
  this.data(data);

  this.slideIn();
}

SlidePanel.prototype.closePanel = function() {
  this.template(null);
  this.data(null);
  this.slideOut();
  this.onClose().forEach(function(func) {
    Deps.afterFlush(func);
  });
  this._onClose = [];
}

SlidePanel.prototype.slideIn = function() {
  this.slidePanelTemp.$('.slide-panel, .slide-panel-overlay').addClass('slide-in');
  this._inView = true;
}

SlidePanel.prototype.slideOut = function() {
  this.slidePanelTemp.$('.slide-panel, .slide-panel-overlay').removeClass('slide-in');
  this._inView = false;
}

SlidePanel.prototype.remove = function() {
  this._currentTemplate = null;
  this._currentData = null;
  this._overlay = null;
  this.removed = true;
}

slidePanel = new SlidePanel();