  // Function onLoad is where any preliminary setup happens
function onLoad() {

  _2DView = new View2D(); 
  _3DView = new View3D(); 


  //!Class: your onLoad() setup functions here

  // set the class that is drawn when the mouse is clicked
  _currentElementClass = EllipseOnePointElement;

  // load any resources, media, etc.
  _human3D = _2DView.p5.loadModel('media/human3D.obj', false);
  _human2D = _3DView.p5.loadImage('media/human2D.png');

  
  var anElement = new EllipseOnePointElement([{x:100, y: 100, z:0}]);
  _elementList.push(anElement);



  //End Class: onLoad() setup functions 
}

function onClassChange(aclass) {
  _currentElementClass = eval(aclass);
}


function change_appliance_color(appliance) {
  // set every appliance to the (same) default color
  for (let i = 0; i < appliance_list.length; i++) {
    appliance_list[i].current_color.r = appliance_default_color.r;
    appliance_list[i].current_color.g = appliance_default_color.g;
    appliance_list[i].current_color.b = appliance_default_color.b;

    // if the appliance list item is the appliance that was called/passed in, then change that appliance's current color to its selct color
    if (appliance_list[i].name == appliance) {
      appliance_list[i].current_color.r = appliance_list[i].select_color.r;
      appliance_list[i].current_color.g = appliance_list[i].select_color.g;
      appliance_list[i].current_color.b = appliance_list[i].select_color.b;
    }
  }


// function change_oven_color() {
//   if (document.getElementById("oven").checked == true) {
//     oven_color.r = oven_color_selected.r;
//     oven_color.g = oven_color_selected.g;
//     oven_color.b = oven_color_selected.b;
//     console.log("oven checked true");
//     //console.log(document.getElementById("fridge").checked)
//     change_fridge_color();
  
//   }
//   else {
//     oven_color.r = oven_color_default.r;
//     oven_color.g = oven_color_default.g;
//     oven_color.b = oven_color_default.b;
//     console.log("not checked")
//   }

  // oven_color.r = 0;
  // oven_color.g = 0;
  // oven_color.b = 255;

  
}

// function change_appliance_color(){
//   if (document.getElementById("fridge").checked == true) {
//     fridge_color.r = fridge_color_selected.r;
//     fridge_color.g = fridge_color_selected.g;
//     fridge_color.b = fridge_color_selected.b
//     //console.log(" fridge checked true");
//   }
//   else if (document.getElementById("oven").checked == true) {
//       oven_color.r = oven_color_selected.r;
//       oven_color.g = oven_color_selected.g;
//       oven_color.b = oven_color_selected.b;
//       console.log("oven checked true");
//       //console.log(document.getElementById("fridge").checked)
//       change_fridge_color();


// }

// function change_fridge_color() {
//   if (document.getElementById("fridge").checked == true) {
//     fridge_color.r = fridge_color_selected.r;
//     fridge_color.g = fridge_color_selected.g;
//     fridge_color.b = fridge_color_selected.b;
//     console.log(" fridge checked true");
//     //console.log(document.getElementById("oven").checked)
//     change_oven_color();
//   }
//   else {
//     fridge_color.r = fridge_color_default.r;
//     fridge_color.g = fridge_color_default.g;
//     fridge_color.b = fridge_color_default.b;
//     console.log("not checked")
//   }
  
// }

function onChangeAmbientValue(aval) {
  _ambientVal = aval;

}

  //!Class: any callback functions here

