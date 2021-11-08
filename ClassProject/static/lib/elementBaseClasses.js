/////////////////////////////////   Element   ///////////////////////////////////
class Element {
  constructor() {
    // These are system parameters, be careful changing or overwriting these in your classes
    this.class = this.constructor.name;
    this.children = [];
    this.points = [];
    this.selected = false;

    // feel free to modifty these in the base class or subclasses
    this.size = { "x": 10, "y": 10, "z": 10 };
    this.color = "#888888";
    this.rotation = 0;
    this.opacity = 1;


  }
  draw2D(ap5) { };
  draw3D(ap5) { };
  mouseClicked3D(ap5) {
    return false;
  };
  mouseClicked2D(ap5) {
    if (Math.abs(ap5.mouseX - this.points[0].x) <= this.size.x  / 2 && Math.abs(ap5.mouseY - this.points[0].y) <= this.size.y / 2)  {
      this.selected = !this.selected;
      return true;
    }
    else return false;
  };

  mouseDragged(pdelta) {
    for (var j = 0; j < this.points.length; j++) {
      this.points[j].x += pdelta.x;
      this.points[j].y += pdelta.y;
    }
  }

  getColorOpacitySelect(ap5) {
    // creates an color with alpha from the current color text string and opacity number (0<1)
    var acolor;
    if (ap5) {
    if (this.selected) acolor = ap5.color("#ff7777"); else acolor = ap5.color(this.color);
    }
    else {
      if (this.selected) acolor = color("#ff7777"); else acolor = color(this.color);
    }
    acolor.setAlpha(this.opacity * 255);
    return acolor;

  }

}

/////////////////////////////////   OnePointElement   ///////////////////////////////////

class OnePointElement extends Element {
  constructor(pts) {
    super();
    this.points = pts;
  }
}
OnePointElement.createType = "onePoint";



/////////////////////////////////   TwoPointElement   ///////////////////////////////////


class TwoPointElement extends Element {
  constructor(pts, asize, angle) {
    super();
    this.points = pts;

    this.closed = false;
  }


  mouseClicked2D(ap5) {
    var mousePoint = { "x": ap5.mouseX, "y": ap5.mouseY, "z": 0 };
    for (var i = 0; i < this.points.length; i++) {

      if (closePoints(this.points[i], mousePoint)) {
        this.selected = !this.selected;
        return true;
      }
    }
    return false;
  };

}
TwoPointElement.createType = "twoPoint";

class MultiPointElement extends Element {
  constructor(pts, asize, angle) {
    super();
    this.points = pts;
    // Now fix the start - end point situation
    // if the start and end points are close, get rid of the end point and close the walls
    if (this.points && closePoints(this.points[0], this.points[this.points.length - 1])) {
      this.points.pop();
      this.closed = true;
    }
    //otherwise the shape is open
    else this.closed = false;
  }


  mouseClicked2D(ap5) {
    var mousePoint = { "x": ap5.mouseX, "y": ap5.mouseY, "z": 0 };
    for (var i = 0; i < this.points.length; i++) {

      if (closePoints(this.points[i], mousePoint)) {
        this.selected = !this.selected;
        return true;
      }
    }
    return false;
  };

}
MultiPointElement.createType = "multiPoint";


