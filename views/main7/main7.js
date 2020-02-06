// ** VARS **
var hoveringProject = {};
var scale = 16;
var logo, topBar, bottomBar;
var menuOpen = false;
var windowHeight;
var circleScale;
var circle;
var menuBar,
    mbBackground,
    mbiAbout,
    mbiProjects,
    mbiContact,
    mbiNav;

var projectPages;

var Main7View = function () {
  console.log ("---Main7View()");
  positron.View.call (this);
};

monohm.inherits (Main7View, positron.View);

Main7View.prototype.onDOMReady = function () {
  positron.View.prototype.onDOMReady.call (this);
  console.log ("Main7View onDOMReady called");

  // document.body.className -= 'nopaque'; // fade in
  // var main = document.querySelector('.main');
  // console.log(main);
  // console.log(main.classList);
  // main.classList.remove('nopaque');
  // this.element.classList.remove('nopaque'); // fade in

  // var elem = document.querySelector('.carousel');
  // var flkty = new Flickity( elem, {
  //   // options
  //   autoPlay: 2000,
  //   imagesLoaded: true,
  //   wrapAround: true,
  //   prevNextButtons: false,
  //   pageDots: false,
  //   setGallerySize: false,
  //   pauseAutoPlayOnHover: false,
  //   cellSelector: '.carousel-cell'
  // });
  // elem.addEventListener('mouseleave', function(e) { flkty.playPlayer() }); // cute little code for re-enabling the autoplay after someone flicked it

  // init once
  logo = document.querySelector('.logo');
  topBar = this.element.querySelector('.topBar');
  bottomBar = this.element.querySelector('.bottomBar');
  windowHeight = window.innerHeight;
  circle = document.querySelector('.circle');
  // menuBar = document.querySelector('.menuBar');
  // mbBackground = menuBar.querySelector('.mbBackground');
  // mbiAbout = menuBar.querySelector('.mbiAbout');
  // mbiProjects = menuBar.querySelector('.mbiProjects');
  // mbiContact = menuBar.querySelector('.mbiContact');
  // mbiNav = menuBar.querySelector('.mbiNav');


  logo.addEventListener('click', function() {
    console.log(this + ' clicked'); // debug 
    smoothScroll('top');
  });

};

Main7View.prototype.onVisible = function () {
  console.log ("---Main7View.onVisible()");
  processHash(); // process hash once when the page loads 
};



Main7View.prototype.start3Deffect = function(inEvent) {
  hoveringProject.this = inEvent.target.children[0]; // grabs content div
  hoveringProject.sizeX = inEvent.target.clientWidth;
  hoveringProject.sizeY = inEvent.target.clientHeight;
  hoveringProject.topshadowleft = hoveringProject.this.querySelector('.topshadowleft');
  hoveringProject.topshadowright = hoveringProject.this.querySelector('.topshadowright');
  hoveringProject.topshadowbottom = hoveringProject.this.querySelector('.topshadowbottom');
  hoveringProject.backshadowbottom = hoveringProject.this.querySelector('.backshadowbottom');

  hoveringProject.this.classList.remove('centered');
  hoveringProject.topshadowleft.classList.remove('clearshadows');
  hoveringProject.topshadowright.classList.remove('clearshadows');
  hoveringProject.topshadowbottom.classList.remove('clearshadows');
  hoveringProject.backshadowbottom.classList.remove('clearshadows');
}

Main7View.prototype.end3Deffect = function(inEvent) {
  hoveringProject.this.classList.add('centered');
  hoveringProject.topshadowleft.classList.add('clearshadows');
  hoveringProject.topshadowright.classList.add('clearshadows');
  hoveringProject.topshadowbottom.classList.add('clearshadows');
  hoveringProject.backshadowbottom.classList.add('clearshadows');
}

Main7View.prototype.hover3Deffect = function(inEvent) {

  // calc mouse
  hoveringProject.rawPosX = inEvent.offsetX;
  hoveringProject.rawPosY = inEvent.offsetY;
  hoveringProject.posX = ( hoveringProject.sizeX - hoveringProject.rawPosX - ( hoveringProject.sizeX / 2 ) ) / ( hoveringProject.sizeX / 2 ) * -1 ;
  hoveringProject.posY = ( hoveringProject.sizeY - hoveringProject.rawPosY - ( hoveringProject.sizeY / 2 ) ) / ( hoveringProject.sizeY / 2 ) * -1;
  hoveringProject.rotateX = hoveringProject.posX * scale ;
  hoveringProject.rotateY = -1 * hoveringProject.posY * scale ;

  // 3D transform project
  hoveringProject.this.style.transform = "rotateY(" + hoveringProject.rotateX + "deg) rotateX(" + hoveringProject.rotateY + "deg)";

  // add shadows
  // horizontal (x)
  if (hoveringProject.posX > 0) {
    hoveringProject.topshadowright.style.opacity = hoveringProject.posX;
    hoveringProject.topshadowleft.style.opacity = 0;
  }
  else if (hoveringProject.posX < 0) {
    hoveringProject.topshadowright.style.opacity = 0;
    hoveringProject.topshadowleft.style.opacity = -1 * hoveringProject.posX;
  }

  // vertical (y)
  if (hoveringProject.posY > 0) {
    hoveringProject.topshadowbottom.style.opacity = hoveringProject.posY;
    hoveringProject.backshadowbottom.style.opacity = 0;
  }
  else if (hoveringProject.posY < 0) {
    hoveringProject.topshadowbottom.style.opacity = 0;
    hoveringProject.backshadowbottom.style.opacity = hoveringProject.posY * -1;
  }

}

Main7View.prototype.menuButtonPress = function(inEvent) {

  // toggle menu button
  menuOpen = !menuOpen;
  if ( menuOpen ) {
    topBar.classList.add('topBarOpen');
    bottomBar.classList.add('bottomBarOpen');
    mbBackground.classList.add('mbBackgroundBig');

    mbiAbout.classList.remove('mbiHide');
    mbiProjects.classList.remove('mbiHide');
    mbiContact.classList.remove('mbiHide');
    // mbiNav.classList.remove('mbiNavHidden');

  } else {
    topBar.classList.remove('topBarOpen');
    bottomBar.classList.remove('bottomBarOpen');
    mbBackground.classList.remove('mbBackgroundBig');

    mbiAbout.classList.add('mbiHide');
    mbiProjects.classList.add('mbiHide');
    mbiContact.classList.add('mbiHide');
    // mbiNav.classList.add('mbiNavHidden');
  }

}




  // hash route handling 
  window.addEventListener("hashchange", function() {
    // console.log(window.location.hash); // debug 
    processHash();

  }, false);


function processHash() {
  
  if ( (window.location.hash == '') || (window.location.hash == '#') ) {
    hideAllProjectViews();
  }
  else {
    hideAllProjectViews();
    showProjectView(window.location.hash);
  }

}



  projectViews = document.querySelector('.projectViews').children;
  function hideAllProjectViews() {
    document.body.classList.remove('no-scroll'); // disabling underscrool for safari

    [].forEach.call(projectViews, function(el) {

      let view = el.getAttribute('p-view');
      gApplication.hideView(view);
      el.classList.remove('active');

    }); // array looper

  }


  function showProjectView(hashView) {
    document.body.classList.add('no-scroll'); // disabling underscrool for safari
    // smoothScroll('top'); // reset the logo to upright w ease
    
    [].forEach.call(projectViews, function(el) {

      var hashRoute = el.getAttribute('data-hash-route');
      
      if ( hashView == hashRoute ) {
        gApplication.showView( el.getAttribute('p-view') );
        el.classList.add('active');
      }
      else {
        gApplication.hideView( el.getAttribute('p-view') );
      }

    }); // array looper

  }



window.addEventListener('scroll', function(e) {
  var yOffset = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);

  // TODO: rotate SC logo on main page AND project pages 

  // rotate sc logo
  var rotate = yOffset / 2;
  logo.style.transform = 'rotateZ(' + rotate + 'deg)';
});





// *** SMOOTH SCROLLING TO ANCHOR ***
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}
function elmYPosition(eID) {
  var elm = document.getElementById(eID);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
  } return y;
}
function smoothScroll(eID) {
  var startY = currentYPosition();
  var stopY = elmYPosition(eID);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
      scrollTo(0, stopY); return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
      for ( var i=startY; i<stopY; i+=step ) {
          setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
          leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
  }
  for ( var i=startY; i>stopY; i-=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
  }
}