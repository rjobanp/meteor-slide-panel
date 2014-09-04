[![LICENSE](http://img.shields.io/badge/LICENSE-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# meteor-slide-panel

Dynamic slide panel for meteor. Built as a replacement for modals on responsive sites. Uses iron:dynamic-template as a dependency. 

``` sh
$ meteor add rosh93:slide-panel
```

## API

Call these methods from anywhere in your app

### Open a panel

```javascript
slidePanel.showPanel(template, data);
```
`template` should be a template object: `Template.myTemplate`

`data` is the optional context on the template

The template `created` and `rendered` hooks will be called when the panel is shown

### On Close hook for the current panel

```javascript
slidePanel.onClose(function() {
  // do some stuff once the panel is closed
});
```
`onClose` Can be called multiple times after `showPanel` is called

Each function passed to `onClose` will be run after the open panel is closed

### Close the open panel

```javascript
slidePanel.closePanel();
```
All `onClose` hooks will be run

Template `destroyed` hook of the closed template will run

### Enable the overlay

```javascript
slidePanel.overlay(true); // default 'false'
```
Call this once within your app to enable the overlay option on your panels

This is useful on higher resolution screens when the panel doesn't cover the entire width, as it disables access to the content underneath


## Example Setup

Include `{{> slidePanel}}`

You should only include `{{> slidePanel}}` once in your app

### Iron router example setup:
```html
<body>
  <div class="content">
    {{> yield}}
  </div>

  {{> slidePanel}}
</body>
```

### Create templates for your panels
```html
<template name="confirm">
  <h2>Confirm the change?</h2>
  <button class="confirm">Yes</button>
  <button class="close">Close</button>
</template>
```
```javascript
Template.confirm.events({
  'click .confirm': function() {
    // Save();

    slidePanel.close();
  },
  'click .close': function() {
    slidePanel.close();
  }
});
Template.confirm.rendered = function() {
  var self = this;

  // Do some setup in here for when the panel is shown
  Session.set('confirmed', null);

  // Setup an on close handler
  slidePanel.onClose(function() {
    // Fun stuff
  });
}
Template.confirm.destroyed = function() {
  // Can do some cleanup in here
}
```

### Open the panel from another template
```javascript
Template.exampleTemplate.events({
  'click': function(event, temp) {
    slidePanel.showPanel(Template.confirm, temp.data);
    
    // Setup an on close handler
    slidePanel.onClose(function() {
      temp.confirmedVar = true;
    });
  }
});
```

## Customization

Override the styles in `slidepanel.css`