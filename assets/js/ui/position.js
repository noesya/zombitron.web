
let position = new Nexus.Position('#content', {
    'size': [300, 300],
    'mode': 'absolute',  // "absolute" or "relative"
    'x': 0.5,  // initial x value
    'minX': 0,
    'maxX': 1,
    'stepX': 0,
    'y': 0,  // initial y value
    'minY': 0,
    'maxY': 1,
    'stepY': 0
}
);

const socket = io();

position.on('change', function (v) {
    socket.emit('position', v)
})

window.addEventListener("devicemotion", (event) => {
    console.log(event);
});
