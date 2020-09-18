const cnv = document.getElementById('canvas1');
const ctx = cnv.getContext('2d');

ctx.fillStyle = "red";
ctx.fillRect(10,10,100,100);
ctx.height = window.height;
ctx.width = window.width;
