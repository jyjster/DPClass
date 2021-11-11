//  Views.js
// Contains: 
// the View classes:
//  - View
//  - pie_chart
//  - house_3D
//  - ViewTable
// the pie_chart and house_3D functions referenced into View2D and View3D 
//    that override the P5 behavior for each (2D, 3D) Views 


/////////////////////      pie_chart function - generates a P5 instance for the 2D view  ///////////////////////
var pie_chart = function (p5) {

  p5.lastpoint = null;

  ////////////Example///////////////////
  let og_data = [30, 10, 45, 35, 60, 38, 75, 67];

  // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
  // spread operator does not copy nested data, but works here because shallow copy
  var current_data = [...og_data];
  var color_1_str = 'grey';
  var color_2_str = 'grey';
  var rect_color = "#FFFFFF";

  // console.log(current_data);

  // if any key is pressed, chechKey
  // document.onkeydown = checkKey;



  /////////////////////   2D setup() function     ////////////////////////
  p5.setup = function () {
    // var acanvas = p5.createCanvas(500, 400);
    var myCanvas = createCanvas(720, 500);
    // acanvas.parent("Canvas2DDIV");
    myCanvas.parent("myCanvasDiv");

    p5.noStroke();
    //!CLASS: Your 2D setup here
    // p5.background(51);

  }

  /////////////////////   2D draw() function     ////////////////////////
  p5.draw = function() {
    // background(100);
    // background(0,255,0);
    p5.background(rect_color);
    pieChart(300, current_data);
  }
  
  /////////////////////   pie chart function     ////////////////////////
  function pieChart(diameter, data) {
    // console.log("test:", data);
    var my_color_1, my_color_2;
  
    let lastAngle = 0;
  
    for (let i = 0; i < data.length; i++) {
      let color_val = p5.map(i, 0, data.length, 0, 255);
      // 255 - colorval
      // if data is an even number
      if (i % 2 == 0) {
        if (color_1_str == 'red') {
          p5.fill(255, color_val, 0);
        }
        else if (color_1_str == 'green'){
          p5.fill(0, color_val, 0);
          // fill (0, 255, color_val); // green
        }
        else if (color_1_str == 'blue') {
          p5.fill(0,color_val, 255);
        }
        else {
          p5.fill(color_val, color_val, color_val);
        }
      }
      else {
        if (color_2_str == 'red') {
          p5.fill(255, 255-color_val, 0);
        }
        else if (color_2_str == 'green'){
          p5.fill(0, 255, 255-color_val);
        }
        else if (color_2_str == 'blue') {
          p5.fill(0,255-color_val, 255);
        }
        else {
          p5.fill(255-color_val, 255-color_val, 255-color_val);
        }
      }
  
      p5.arc(
        width / 2,
        height / 2,
        diameter,
        diameter,
        lastAngle,
        lastAngle + p5.radians(current_data[i])
      );
      lastAngle += p5.radians(current_data[i]);
      
    }
  }
  
  
  // p5.draw = function () {
  //   p5.push();
  //   p5.background(255);
  //   this.setGrid();
  //   // this.drawGrid();

    // Draw the 2D elements
    for (var i = 0; i < _elementList.length; i++) { _elementList[i].draw2D(p5); }

    // if it's not a onePoint class, draw lines between all the currentPointList points including the current mouse point.
    if (_currentElementClass.createType != "onePoint" && _currentPointList.length > 0) {
      _currentPointList.push({ "x": p5.mouseX, "y": p5.mouseY, "z": 0 })  // add the current mouse point
      for (i = 1; i < _currentPointList.length; i++) { 
        p5.line(_currentPointList[i - 1].x, _currentPointList[i - 1].y, _currentPointList[i].x, _currentPointList[i].y) // draw the lines
      };
      _currentPointList.pop();  // remove the current mouse point
    }

    //!Class: your 2D draw functionality here, or objects that are not included in classes  like ground plane, etc.
    



    //End Class: your 2D draw functionality here


    p5.pop();
  }


  /////////////////////   2D mouseDragged() function     ////////////////////////
  p5.mouseDragged = function () {
    this.setGrid();
    if (p5.mouseX < 0 || p5.mouseX > p5.width || p5.mouseY < 0 || p5.mouseY > p5.height) return;
    var pdelta = { "x": p5.mouseX - p5.lastpoint.x, "y": p5.mouseY - p5.lastpoint.y };
    for (i = 0; i < _elementList.length; i++) {
      var elem = _elementList[i];
      if (elem.selected) {
        elem.mouseDragged(pdelta);
      }
      //for (i=0;i<_elementList.length;i++) _elementList[i].mouseClicked2D(p5);
      p5.lastpoint = { "x": p5.mouseX, "y": p5.mouseY };
    }
  }

  /////////////////////   2D mouseClicked() function     ////////////////////////
  p5.mouseClicked = function () {
    if (p5.mouseX < 0 || p5.mouseX > p5.width || p5.mouseY < 0 || p5.mouseY > p5.height) return;  // if we are not in the current view exit

    // check for mouse selection
    var elementClicked = false;
    for (i = 0; i < _elementList.length; i++) {
      if (_elementList[i].mouseClicked2D(p5)) elementClicked = true;
    }
    if (elementClicked) {
      _currentPointList = []; // reset pointList
    }

    // if no element is clicked create a new element based on the _currentElementClass
    if (!elementClicked) {  

      _currentPointList.push({ "x": p5.mouseX, "y": p5.mouseY, "z": 0 });

      if (_currentElementClass.createType == "onePoint") {
        _elementList.push(new _currentElementClass([{ "x": p5.mouseX, "y": p5.mouseY, "z": 0 }]));
        _currentPointList = [];
      }

      if (_currentElementClass.createType == "twoPoint" && _currentPointList.length == 2) {
        _elementList.push(new _currentElementClass(_currentPointList));
        _currentPointList = [];
      }

      if (_currentElementClass.createType == "multiPoint" && _currentPointList.length > 1 && closePoints(_currentPointList[0], _currentPointList[_currentPointList.length - 1])) {
        _elementList.push(new _currentElementClass(_currentPointList));
        _currentPointList = [];
      }

    }

    p5.lastpoint = { "x": p5.mouseX, "y": p5.mouseY };  // save last point

  }


  /////////////////////   2D keyPressed() function     ////////////////////////
  p5.keyPressed = function () {
    if (p5.keyCode === p5.LEFT_ARROW) {
      for (i = 0; i < _elementList.length; i++) {
        // if (_elementList[i].selected) _elementList[i].rotation += p5.PI / 2;
        if (_elementList[i].selected) _elementList[i].rotation += p5.radians(90);
      }
    } else if (p5.keyCode === p5.RIGHT_ARROW) {
      for (i = 0; i < _elementList.length; i++) {
        // if (_elementList[i].selected) _elementList[i].rotation -= p5.PI / 2;
        if (_elementList[i].selected) _elementList[i].rotation -= p5.radians(90);
      }
    }

    else if (p5.keyCode === p5.DELETE) {
      var newArray = [];
      for (i = 0; i < _elementList.length; i++) {
        if (!_elementList[i].selected) newArray.push(_elementList[i]);
      }
      _elementList = newArray;
 
    }

    else if (p5.keyCode === p5.ESCAPE) {
      _currentPointList = [];
      for (i = 0; i < _elementList.length; i++) {
        _elementList[i].selected = false;
      }
    }

    else if (p5.keyCode === p5.ENTER) {
      if (_currentElementClass.createType == "multiPoint" && _currentPointList.length > 1) {
        var newMulti = new _currentElementClass(_currentPointList);
        newMulti.closed = false;
        _elementList.push(newMulti);
        _currentPointList = [];
 
      }
    }

  //!Class: your 2D keyPressed functionality here



  //End Class: your 2D keyPressed functionality here

  }



  /////////////////////   2D drawGrid() function     ////////////////////////
  // p5.drawGrid = function() {
  //   console.log('drawGrid');
  //   p5.stroke(50);
  //   p5.strokeWeight(2);
  //   for (var i = 0; i < p5.width ; i += _xGrid) {
  //     for (var j = 0; j < p5.height ; j += _yGrid) {
  //        p5.point(i,j); 
  //     }
  //   }

  // }

  /////////////////////   2D setGrid() function     ////////////////////////
  p5.setGrid = function() {
    var xround = Math.round(p5.mouseX / _xGrid) * _xGrid;
    var yround = Math.round(p5.mouseY / _yGrid) * _yGrid;
  
    p5.mouseX = xround;
    p5.mouseY = yround;
    
  }



/////////////////////      house_3D function - generates a P5 instance for the 3D view  ///////////////////////
var house_3D = function (p5) {

  //define variables for our media
    // IMAGE TEXTURES
    let wood_1;
    let wood_2;
    // OJBECTS
    let floor_1;
    let floor_2;
    let floor_3;
    let furniture_1;
    let furniture_2;
    let furniture_3;
    let stairs;
    let fridge;
    let dryer;

  /////////////////////   3D preload() function     ////////////////////////

  p5.preload = function() {
    // Load model with normalise parameter set to false
    floor_1 = p5.loadModel('media/floor-1-floor.obj', false); // Imported 3D object
    floor_2 = p5.loadModel('media/floor-2-floor.obj', false); // Imported 3D object
    floor_3 = p5.loadModel('media/floor-3-floor.obj', false); // Imported 3D object
    stairs = p5.loadModel('media/stairs-2.obj', false); // Imported 3D object
    // furniture = loadModel('media/furniture.obj', false);
    furniture_1 = p5.loadModel('media/furniture-floor-1.obj', false); // Imported 3D object
    furniture_2 = p5.loadModel('media/furniture-floor-2.obj', false); // Imported 3D object
    furniture_3 = p5.loadModel('media/furniture-floor-3.obj', false); // Imported 3D object
    fridge = p5.loadModel('media/fridge.obj', false); // Imported 3D object
    dryer = p5.loadModel('media/dryer.obj', false); // Imported 3D object
    // source: https://alquilercastilloshinchables.info/wood-floor-texture-seamless/
    wood_1 = p5.loadImage('media/wood.jpeg'); // MATERIAL #1
    // source: https://www.freecreatives.com/textures/seamless-wood-textures.html
    wood_2 = p5.loadImage('media/wood_2.png'); // MATERIAL #2

  }
  /////////////////////   3D setup() function     ////////////////////////
  p5.setup = function () {
    var acanvas = p5.createCanvas(500, 400, p5.WEBGL);
    acanvas.parent("Canvas3DDIV");
    p5.background(_ambientVal);
  }

    /////////////////////   3D draw() function     ////////////////////////
  p5.draw = function () {
    p5.orbitControl();
    p5.push(); // A STARTING PUSH - JUST TO BE SURE
    p5.rotateX(p5.radians(90)); // always start with this - rotates the model over so +Z is up the screen
    // p5.rotateX(-PI / 6); // this gives us a slight angle to start
    p5.rotateX(p5.radians(-30)); // this gives us a slight angle to start

    //!Class: your 3D draw functionality here
    // p5.background(_ambientVal);
    p5.background(89);
    p5.noStroke();

    //////////////////////////////    Lights   ////////////////////// 
    // p5.ambientLight(_ambientVal, _ambientVal, _ambientVal);
    // p5.directionalLight(255, 255, 255, 200, 200, -200);  // create a white light [pointing (x=200",y=200",z=200")

    p5.ambientLight(150, 150, 150);
    p5.pointLight(255, 255, 255, -200, -200, 500);  // create a white light at (x=-200",y=-200",z=500")
  

    // p5.noStroke();
    // p5.push();
    // p5.rotateX(p5.PI / 2);

    // drawAxes(p5, 100);

    // for (i = 0; i < _elementList.length; i++) _elementList[i].draw3D(p5); // Draw the 3D elements
    
    //////////////////////////////    FLOOR 1          //////////////////////
    p5.push();
    p5.noStroke();

    {
      p5.texture(wood_1); 
      p5.model(floor_1);
    }
    p5.pop();
    //////////////////////////////    FLOOR 2          //////////////////////
    p5.push();
    p5.noStroke();

    {
      p5.texture(wood_1); 
      p5.model(floor_2);
    }
    p5.pop();

    //////////////////////////////    FLOOR 3          //////////////////////
    p5.push();
    p5.noStroke();

    {
      p5.texture(wood_1); 
      p5.model(floor_3);
    }
    p5.pop();

    //////////////////////////////    FURNITURE         //////////////////////
    p5.push();
    p5.noStroke();

    p5.fill(214);
    p5.model(furniture_1);
    p5.model(furniture_2);
    p5.model(furniture_3);
    p5.pop();

    //////////////////////////////    STAIRS       //////////////////////
    p5.push();
    p5.noStroke();
    {
      p5.texture(wood_2);
      p5.model(stairs);
    }
    
    p5.pop();
    //////////////////////////////    FRIDGE          //////////////////////
    p5.push();
    p5.noStroke();

    p5.ambientMaterial(241, 146, 130); // MATERIAL #3
    // TRANSFORMATIONS
    p5.translate(-187, 60, 30); // move to its new location
    p5.rotateZ(p5.radians(-90)); // spin about vertical axis
    // p5.drawAxes(30); // drawAxes before drawing objects if you get confused about the local coordianates
    p5.model(fridge);
    p5.pop();

    //////////////////////////////    DRYER          //////////////////////
    p5.push();
    p5.noStroke();
    p5.ambientMaterial(241, 146, 130);
    // ambientMaterial(255, 0, 0);
    // TRANSFORMATIONS
    p5.translate(-380, 125, -170)
    //rotateZ(radians(90)); // spin about vertical axis
    //drawAxes(30); // drawAxes before drawing objects if you get confused about the local coordianates
    p5.model(dryer);
    p5.pop();

    //////////////////////////////  OVEN (hardcoded, 3d primitive)  //////////////////////
    p5.push();
    p5.noStroke();
    p5.ambientMaterial(241, 146, 130);
    // ambientMaterial(255, 0, 0);
    // TRANSFORMATIONS
    // translate(0,0,0)
    p5.translate(-133, -44, 50);
    //rotateZ(radians(90)); // spin about vertical axis
    //drawAxes(30); // drawAxes before drawing objects if you get confused about the local coordianates
    p5.box(40, 25, 36);
    //box([width], [Height], [depth], [detailX], [detailY])
    p5.pop();

    ////////////////////////////// TEST (hardcoded, 3d primitive)  //////////////////////
    p5.push();
    p5.noStroke();
    p5.ambientMaterial(255, 0, 0);
    // ambientMaterial(255, 0, 0);
    // TRANSFORMATIONS
    // translate(0,0,0)
    p5.translate(-560,150,33);
    //rotateZ(radians(90)); // spin about vertical axis
    //drawAxes(30); // drawAxes before drawing objects if you get confused about the local coordianates
    p5.box(5,5,5);
    //box([width], [Height], [depth], [detailX], [detailY])
    p5.pop();
    
    //End Class: your 3D draw functionality here
    p5.pop();
  }

}




/////////////////////////////////           VIEW CLASSES    //////////////////////////////////////////////////



/////////////////////      BE Root class - mostly just an abstract placeholder  ///////////////////////
class View {
  constructor() {
    this.p5 = null;
  };
}

/////////////////////      View2D class - the view that calls P52D  ///////////////////////

class View2D extends View {
  constructor() {
    super();
    this.p5 = new p5(pie_chart);
    this.p5.view = this;
  };


}


/////////////////////      View3D class - the view that calls P52D  ///////////////////////

class View3D extends View {
  constructor() {
    super();
    this.p5 = new p5(house_3D);
    this.p5.view = this;
  };

}
