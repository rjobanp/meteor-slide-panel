Package.describe({
  summary: "Dynamic slide panel for meteor. Replacement for modals on responsive sites.",
  version: "0.0.1",
  git: "https://github.com/rosh93/meteor-slide-panel"
});

Package.onUse(function(api) {
  api.use('blaze');
  api.use('underscore');
  api.use('ui');
  api.use('jquery');
  api.use('deps');
  api.use('templating');

  api.use('iron:dynamic-template@0.3.0');

  api.versionsFrom('METEOR@0.9.0.1');
  api.addFiles(['slidepanel.js', 'slidepanel_template.html', 'slidepanel_template.js', 'slidepanel.css'], ['client']);
  api.export(['slidePanel'], ['client']);
});