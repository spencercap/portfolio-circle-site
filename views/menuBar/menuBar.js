var topBar, bottomBar;
var menuOpen = false;

var MenuBarView = function () {
  console.log ("---MenuBarView()");
  positron.View.call (this);
};

monohm.inherits (MenuBarView, positron.View);

MenuBarView.prototype.onDOMReady = function () {
  positron.View.prototype.onDOMReady.call (this);
  console.log ("MenuBarView onDOMReady called");

  // inits once
  topBar = this.element.querySelector('.topBar');
  bottomBar = this.element.querySelector('.bottomBar');
};

MenuBarView.prototype.onVisible = function () {
  console.log ("---MenuBarView.onVisible()");
};

MenuBarView.prototype.menuButtonPress = function(inEvent) {

  // toggle menu button 
  menuOpen = !menuOpen;
  if ( menuOpen ) {
    topBar.classList.add('topBarOpen');
    bottomBar.classList.add('bottomBarOpen');
  } else {
    topBar.classList.remove('topBarOpen');
    bottomBar.classList.remove('bottomBarOpen');
  }

}
