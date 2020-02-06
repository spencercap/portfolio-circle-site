var projectViewSonancy = function () {
  console.log ("---projectViewSonancy()");
  positron.View.call (this);
};

monohm.inherits (projectViewSonancy, positron.View);

projectViewSonancy.prototype.onDOMReady = function () {
  positron.View.prototype.onDOMReady.call (this);
  console.log ("projectViewSonancy onDOMReady called");

};

projectViewSonancy.prototype.onVisible = function () {
  console.log ("---projectViewSonancy.onVisible()");
};
