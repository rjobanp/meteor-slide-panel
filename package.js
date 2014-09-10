Package.describe({
  summary: "Dynamic slide panel for meteor. Replacement for modals on responsive sites.",
  version: "0.1.1",
  git: "https://github.com/rosh93/meteor-slide-panel"
});

Package.onUse(function(api) {
  api.use('reactive-var');
  api.use('underscore');
  api.use('tracker');
  api.use('jquery');
  api.use('templating');

  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles(['slidepanel.js', 'slidepanel_template.html', 'slidepanel_template.js', 'slidepanel.css'], ['client']);
  api.export(['slidePanel'], ['client']);
});