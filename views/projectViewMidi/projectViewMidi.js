var ProjectViewMidi = function () {
  console.log ("---ProjectViewMidi()");
  positron.View.call (this);
};

monohm.inherits (ProjectViewMidi, positron.View);

ProjectViewMidi.prototype.onDOMReady = function () {
  positron.View.prototype.onDOMReady.call (this);
  console.log ("ProjectViewMidi onDOMReady called");

};

ProjectViewMidi.prototype.onVisible = function () {
  console.log ("---ProjectViewMidi.onVisible()");
};
