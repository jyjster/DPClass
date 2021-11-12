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

var oven_color = 
    {
    r: 241,
    g: 146,
    b: 130
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

