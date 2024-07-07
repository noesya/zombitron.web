const client = io();
try {
    document.requestFullscreen();
} catch (e) {}

let sequencer = new Nexus.Sequencer('#sequencer', {
  'size': [600, 300],
  'mode': 'toggle',
  'rows': 4,
  'columns': 8,
  'paddingRow': 10,
  'paddingColumn': 10
});

sequencer.matrix.set.all(zombitronica.sequencer.matrix);

sequencer.on('change', (data) => {
  // data est de la forme {row: 2, column: 0, state: true}
  client.emit('sequencer', data)
})