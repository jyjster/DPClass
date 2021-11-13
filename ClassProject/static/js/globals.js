// globals.js
// defines all the global variables. This file is loaded early to ensure every other function that references global variables is defined AFTER the global variables are. 

var _elementList = [];
var _currentElementClass = null;
var _currentPointList = [];

var _xGrid = 20;
var _yGrid = 40;

var _2DView;
var _3DView;


var _ambientVal = 50;

var _human3D;
var _human2D;

//!Class: define your global variables here

var oven_color_default = 
    {
    r: 241,
    g: 146,
    b: 130
    }

var oven_color_selected = 
    {
    r: 0,
    g: 0,
    b: 255
    }

var oven_color = {
    r: oven_color_default.r,
    g: oven_color_default.g,
    b: oven_color_default.b 
    }

var fridge_color_default = 
    {
    r: 241,
    g: 146,
    b: 130
    }

var fridge_color_selected = 
    {
    r: 0,
    g: 0,
    b: 255
    }

var fridge_color = {
    r: fridge_color_default.r,
    g: fridge_color_default.g,
    b: fridge_color_default.b 
    }


// _elements = [
//     {
//         name: "Name01",
//         color: "#FF0000",

//         points: [
//             {
//                 x: 100,
//                 y: 100,
//                 z: 100,
//             }
//         ],

//         size: {
//             x: 100,
//             y: 100,
//             z: 100,
//         }
//     },

//     {
//         name: "Name02",
//         color: "#FFFF00",

//         points: [
//             {
//                 x: 100,
//                 y: 100,
//                 z: 100,
//             }
//         ],

//         size: {
//             x: 100,
//             y: 100,
//             z: 100,
//         }
//     }
// ];

