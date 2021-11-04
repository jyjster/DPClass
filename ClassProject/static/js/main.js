  // Function onLoad is where any preliminary setup happens
function onLoad() {

  _2DView = new View2D(); 
  _3DView = new View3D(); 


  //!Class: your onLoad() setup functions here

  // set the class that is drawn when the mouse is clicked
  _currentElementClass = EllipseOnePointElement;

  // load any resources, media, etc.
  _human3D = _2DView.p5.loadModel('media/male-export.obj', false);
  _human2D = _3DView.p5.loadImage('media/human2D.png');



  //End Class: onLoad() setup functions 
}

function onClassChange(aclass) {
  _currentElementClass = eval(aclass);
}

function onChangeAmbientValue(aval) {
  _ambientVal = aval;

}

  //!Class: any callback functions here

