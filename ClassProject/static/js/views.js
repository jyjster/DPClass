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
    var myCanvas = p5.createCanvas(720, 500);
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
        p5.width / 2,
        p5.height / 2,
        diameter,
        diameter,
        lastAngle,
        lastAngle + p5.radians(current_data[i])
      );
      lastAngle += p5.radians(current_data[i]);
      
    }
  }
  
    // p5.pop();
  }


  //!Class: your 2D keyPressed functionality here



  //End Class: your 2D keyPressed functionality here




/////////////////////      house_3D function - generates a P5 instance for the 3D view  ///////////////////////
var house_3D = function (p5) {
    var zoom = 0.50;

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
    
    p5.scale(zoom);
    p5.translate(30,0,100);

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

    // p5.ambientMaterial(241, 146, 130); // MATERIAL #3
    p5.ambientMaterial(fridge_color.r, fridge_color.g, fridge_color.b);

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

    // p5.ambientMaterial(241, 146, 130);
    p5.ambientMaterial(oven_color.r, oven_color.g, oven_color.b);

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
