var projectViewMemsMic = function () {
  console.log ("---projectViewMemsMic()");
  positron.View.call (this);
};

monohm.inherits (projectViewMemsMic, positron.View);

projectViewMemsMic.prototype.onDOMReady = function () {
  positron.View.prototype.onDOMReady.call (this);
  console.log ("projectViewMemsMic onDOMReady called");

};

projectViewMemsMic.prototype.onVisible = function () {
  console.log ("---projectViewMemsMic.onVisible()");
};
