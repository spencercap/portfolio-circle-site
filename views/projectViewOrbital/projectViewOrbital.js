var projectViewOrbital = function () {
  console.log ("---projectViewOrbital()");
  positron.View.call (this);
};

monohm.inherits (projectViewOrbital, positron.View);

projectViewOrbital.prototype.onDOMReady = function () {
  positron.View.prototype.onDOMReady.call (this);
  console.log ("projectViewOrbital onDOMReady called");

};

projectViewOrbital.prototype.onVisible = function () {
  console.log ("---projectViewOrbital.onVisible()");
};
