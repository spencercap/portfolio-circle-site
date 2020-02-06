var ProjectView = function () {
  console.log ("---ProjectView()");
  positron.View.call (this);
};

monohm.inherits (ProjectView, positron.View);

ProjectView.prototype.onDOMReady = function () {
  positron.View.prototype.onDOMReady.call (this);
  console.log ("ProjectView onDOMReady called");

  var elem = document.querySelector('.carousel');
  var flkty = new Flickity( elem, {
    // options
    autoPlay: true,
    wrapAround: true
  });
};

ProjectView.prototype.onVisible = function () {
  console.log ("---ProjectView.onVisible()");
};

var project = {};
var scale = 16;

var topshadowleft  = document.querySelector('.topshadowleft');
var topshadowright = document.querySelector('.topshadowright');
var topshadowbottom  = document.querySelector('.topshadowbottom');

var backshadowbottom = document.querySelector('.backshadowbottom');

ProjectView.prototype.startHover = function(inEvent) {
  project.this = inEvent.target.children[0]; // grabs content div
  project.sizeX = inEvent.target.clientWidth;
  project.sizeY = inEvent.target.clientHeight;

  project.this.classList.remove('centered');

  topshadowleft.classList.remove('clearshadows');
  topshadowright.classList.remove('clearshadows');
  topshadowbottom.classList.remove('clearshadows');

  backshadowbottom.classList.remove('clearshadows');
}
ProjectView.prototype.endHover = function(inEvent) {
  project.this.classList.add('centered');

  topshadowleft.classList.add('clearshadows');
  topshadowright.classList.add('clearshadows');
  topshadowbottom.classList.add('clearshadows');

  backshadowbottom.classList.add('clearshadows');
}

ProjectView.prototype.hovering = function(inEvent) {

  /** CALCS **/
  project.rawPosX = inEvent.offsetX;
  project.rawPosY = inEvent.offsetY;
  project.posX = ( project.sizeX - project.rawPosX - ( project.sizeX / 2 ) ) / ( project.sizeX / 2 ) * -1 ;
  project.posY = ( project.sizeY - project.rawPosY - ( project.sizeY / 2 ) ) / ( project.sizeY / 2 ) * -1;
  project.rotateX = project.posX * scale ;
  project.rotateY = -1 * project.posY * scale ;
  // console.log(project.posX, project.posY);
  // console.log("rotateY(" + project.rotateX + "deg) rotateX(" + project.rotateY + "deg)");
  // console.log(inEvent);


  /** SETS **/
  project.this.style.transform = "rotateY(" + project.rotateX + "deg) rotateX(" + project.rotateY + "deg)";

  if (project.posX > 0) {
    topshadowright.style.opacity = project.posX;
    topshadowleft.style.opacity = 0;
  }
  else if (project.posX < 0) {
    topshadowright.style.opacity = 0;
    topshadowleft.style.opacity = -1 * project.posX;
  }

  if (project.posY > 0) {
    topshadowbottom.style.opacity = project.posY;

    backshadowbottom.style.opacity = 0;
  }
  else if (project.posY < 0) {
    topshadowbottom.style.opacity = 0;
    backshadowbottom.style.opacity = (project.posY *-1);
  }

}
