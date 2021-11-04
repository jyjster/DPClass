////////////////////////////////////            a couple of example classes         ////////////////////////////////////////////
// Modify or copy and paste to make new ones

//////////////////////////////////////////////////            HumanElement         ////////////////////////////////////////////
class HumanElement extends OnePointElement {
    constructor(pts) {
        super(pts);
        this.size = { "x": 50, "y": 30, "z": 20 };
    }

    draw2D(ap5) {
        ap5.push();
        ap5.imageMode(ap5.CENTER);
        var acolor = this.getColorOpacitySelect(ap5);
        ap5.tint(acolor);
        ap5.translate(this.points[0].x, this.points[0].y);
        ap5.rotate(this.rotation);

        //!Class: change draw behavior here
        ap5.image(_human2D, 0, 0, this.size.x, this.size.y);


        ap5.pop();
    }

    draw3D(ap5) {
        ap5.push();
        var acolor = this.getColorOpacitySelect(ap5);
        ap5.fill(acolor);
        ap5.translate(this.points[0].x, this.points[0].y, this.points[0].z);
        ap5.rotateZ(this.rotation);

        //!Class: change model variable to draw different model, add any other draw behavior
        ap5.model(_human3D);


        ap5.pop();
    }

}


////////////////////////////////////           EllipseOnePointElement        ////////////////////////////////////////////
class EllipseOnePointElement extends OnePointElement {
    constructor(pts) {
        super(pts);
        this.size = { "x": 50, "y": 30, "z": 20 };
    }

    draw2D(ap5) {
        ap5.push();
        ap5.rectMode(ap5.CENTER);
        var acolor = this.getColorOpacitySelect(ap5);
        ap5.fill(acolor);
        ap5.translate(this.points[0].x, this.points[0].y, this.points[0].z);
        ap5.rotate(this.rotation);

        //!Class: change draw behavior here
        ap5.ellipse(0, 0, this.size.x, this.size.y);

        //End Class: draw3D
        ap5.pop();
    }

    draw3D(ap5) {
        ap5.push();
        var acolor = this.getColorOpacitySelect(ap5);
        ap5.fill(acolor);
        ap5.translate(this.points[0].x, this.points[0].y, this.points[0].z ); 
        ap5.translate(0,0, this.size.z/2); // move up 1/2 so it sits on the floor if its a P5 primitive
        ap5.rotateZ(this.rotation);
        ap5.scale(this.size.x, this.size.y, this.size.z);

        //!Class: change model variable to draw different model, add any other draw behavior
        ap5.rotateX(ap5.PI / 2);
        ap5.noStroke();
        ap5.cylinder(0.5, 1);

        //End Class: draw3D
        ap5.pop();


    }

}


////////////////////////////////////            MultiPointWallElement        ////////////////////////////////////////////
class MultiPointWallElement extends MultiPointElement {
    constructor(pts) {
        super(pts);

        //!Class: define any default behaviors, look, etc. here
        this.thickness = 10;
        this.size = { "x": 0, "y": 0, "z": 100 };
        this.color = "#aaaaaa";
        this.opacity = .25;
        //End Class: constructor 
    }

    draw2D(ap5) {
        ap5.push();
        var acolor = this.getColorOpacitySelect(ap5);
        ap5.stroke(acolor);

        ap5.strokeWeight(4);

        // draw all the line segments
        for (i = 1; i < this.points.length; i++) { ap5.line(this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y) };
        // if closed draw the closing line between end and start points.
        if (this.closed) { ap5.line(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y, this.points[0].x, this.points[0].y) };

        ap5.pop();
    }

    draw3D(ap5) {
        ap5.push();
        var acolor = this.getColorOpacitySelect(ap5);
        ap5.fill(acolor);

        var wall_data = {
            type: { curve: false },
            height: parseFloat(this.size.z),
            thickness: this.thickness,
            closed: this.closed, // curve is open & walls are generated off this curve
        };

        ap5.specularMaterial(acolor);
        Construct_Wall(ap5, this.points, wall_data);

        ap5.pop();


    }



}


////////////////////////////////////        TwoPointBoxElement         //////////////////////////////////////

class TwoPointBoxElement extends TwoPointElement {
    constructor(pts) {
        super(pts);

        this.thickness = 0;
        this.color = "#00ffff";
        this.opacity = 0.25;
        this.size = {x:0,y:0,z:50}
    }

    // this is the same mouse select algorithm as a single point element.
    mouseClicked2D(ap5) {
        if (Math.abs(ap5.mouseX - (this.points[0].x + this.points[1].x) / 2) <= this.calcSize().x  / 2 &&
            Math.abs(ap5.mouseY - (this.points[0].y + this.points[1].y) / 2) <= this.calcSize().y / 2) {
            this.selected = !this.selected;
            return true;
        }
        else return false;
    };

    midPoint() {
        return {
            "x": (this.points[0].x + this.points[1].x) / 2,
            "y": (this.points[0].y + this.points[1].y) / 2,
        }

    }

    calcSize() {
        this.size = {
        "x": Math.abs(this.points[0].x - this.points[1].x),
        "y": Math.abs(this.points[0].y - this.points[1].y),
        "z": this.size.z,
        };
        return this.size;
    }

    draw2D(ap5) {
        //var midpoint = ap5

        ap5.push();
        ap5.rectMode(ap5.CENTER);

        var acolor = ap5.color(this.color);
        acolor.setAlpha(this.opacity * 255);
        var acolor = this.getColorOpacitySelect(ap5);
        ap5.fill(acolor);
        ap5.translate(this.midPoint().x, this.midPoint().y);
        ap5.rotate(this.rotation);

        ap5.rect(0, 0, this.calcSize().x, this.calcSize().y);

        ap5.pop();
    }

    draw3D(ap5) {
        ap5.push();
        var acolor = ap5.color(this.color);
        acolor.setAlpha(this.opacity * 255);
        var acolor = this.getColorOpacitySelect(ap5);
        ap5.specularMaterial(acolor);
        var asize = this.calcSize();
        ap5.translate(this.midPoint().x, this.midPoint().y, asize.z/2);
        ap5.rotateZ(this.rotation);


        ap5.box(asize.x, asize.y, asize.z);     
        ap5.pop();
    }
}




