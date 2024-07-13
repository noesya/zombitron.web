function updatePitch(index, pitch) { // pitch = note style C4
    for (let i = 0; i < synths[index].sequence.length; i++) {
        if (synths[index].sequence.events[i]) {
            synths[index].sequence.events[i] = pitch
        }
    }
    synths[index].note = pitch
}

let initMatrix = [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 0, 1, 0]
]

function getSeq(n) {
    const note = synths[n].note
    let row = initMatrix[n];
    let notes = [null, null, null, null, null, null, null, null]
    for (let i = 0; i < row.length; i++) {
        if (row[i]) {
            notes[i] = note;
        }
    }
    return notes
}

//// FILTERS ////////
const gain = new Tone.Gain(0).toDestination()

const lowpass = new Tone.Filter(2000, "lowpass").toDestination();

const delay = new Tone.Reverb({
    "wet": 0.0,
    "decay": 1.5,
    "preDelay": 0.001
}).chain(lowpass);

const distortion = new Tone.Distortion({
    distortion: 0.0,
    wet: 0.8
}).chain(lowpass);


let cool = new Tone.DuoSynth({
    "volume": -8,
    "detune": 3,
    "portamento": 0.3,
    "vibratoAmount": 0.5,
    "vibratoRate": 5,
    "harmonicity": 1.005,
    "voice0": {
        "envelope": {
            "attack": 0.01,
            "attackCurve": "linear",
            "decay": 0.25,
            "decayCurve": "exponential",
            "release": 1.2,
            "releaseCurve": "exponential",
            "sustain": 0.4
        },
        "filter": {
            "Q": 2,
            "detune": 0,
            "frequency": 0,
            "gain": 0,
            "rolloff": -24,
            "type": "lowpass"
        },
        "filterEnvelope": {
            "attack": 0.001,
            "attackCurve": "linear",
            "decay": 0.05,
            "decayCurve": "exponential",
            "release": 2,
            "releaseCurve": "exponential",
            "sustain": 0.3,
            "baseFrequency": 100,
            "exponent": 2,
            "octaves": 4
        },
        "oscillator": {
            "detune": 0,
            "frequency": 0,
            "partialCount": 0,
            "partials": [],
            "phase": 0,
            "type": "sawtooth"
        }
    },
    "voice1": {
        "envelope": {
            "attack": 0.25,
            "attackCurve": "linear",
            "decay": 4,
            "decayCurve": "exponential",
            "release": 0.8,
            "releaseCurve": "exponential",
            "sustain": 0.1
        },
        "filter": {
            "Q": 2,
            "detune": 0,
            "frequency": 0,
            "gain": 0,
            "rolloff": -12,
            "type": "bandpass"
        },
        "filterEnvelope": {
            "attack": 0.05,
            "attackCurve": "linear",
            "decay": 0.05,
            "decayCurve": "exponential",
            "release": 2,
            "releaseCurve": "exponential",
            "sustain": 0.7,
            "baseFrequency": 5000,
            "exponent": 2,
            "octaves": -1.5
        },
        "oscillator": {
            "detune": 0,
            "frequency": 0,
            "partialCount": 0,
            "partials": [],
            "phase": 0,
            "type": "sawtooth"
        }
    }
}).chain(gain);

let monotron = new Tone.FMSynth({
    "volume": -15,
    "detune": 1,
    "portamento": 1,
    "harmonicity": 4,
    "oscillator": {
        "partialCount": 0,
        "partials": [],
        "phase": 0,
        "type": "sine"
    },
    "envelope": {
        "attack": 0.01,
        "attackCurve": "linear",
        "decay": 0.2,
        "decayCurve": "exponential",
        "release": 0.5,
        "releaseCurve": "exponential",
        "sustain": 1
    },
    "modulation": {
        "partialCount": 0,
        "partials": [],
        "phase": 0,
        "type": "sine"
    },
    "modulationEnvelope": {
        "attack": 0.1,
        "attackCurve": "linear",
        "decay": 0.0001,
        "decayCurve": "exponential",
        "release": 1.5,
        "releaseCurve": "exponential",
        "sustain": 1
    },
    "modulationIndex": 152.22
}).toDestination();


let synths = [
    {
        'synth': new Tone.MembraneSynth({ "volume": -10 }).chain(distortion, delay), // kick
        'note': 'C2'
    },
    {
        'synth': new Tone.MetalSynth({ // metal snare
            "volume": -15,
            "detune": 0,
            "portamento": 0,
            "envelope": {
                "attack": 0.001,
                "attackCurve": "linear",
                "decay": 0.4,
                "decayCurve": "exponential",
                "release": 0.2,
                "releaseCurve": "exponential",
                "sustain": 0
            },
            "harmonicity": 12,
            "modulationIndex": 20,
            "octaves": 1.5,
            "resonance": 800
        }).chain(distortion, delay),
        'note': 'C2'
    },
    {
        'synth': new Tone.FMSynth({ // vroom bass
            'volume': 0,
            'harmonicity': 1,
            'modulationIndex': 3.5,
            'oscillator': {
                'type': "custom",
                'partials': [0, 1, 0, 2]
            },
            'envelope': {
                'attack': 0.08,
                'decay': 0.3,
                'sustain': 0,
            },
            'modulation': {
                'type': "square"
            },
            'modulationEnvelope': {
                'attack': 0.1,
                'decay': 0.2,
                'sustain': 0.3,
                'release': 0.01
            },
        }).chain(distortion, delay),
        'note': 'F2'
    },
    {
        'synth': new Tone.MetalSynth({
            "volume": 0,
            "detune": 0,
            "portamento": 0.5,
            "envelope": {
                "attack": 0.01,
                "attackCurve": "linear",
                "decay": 0.1,
                "decayCurve": "exponential",
                "release": 1,
                "releaseCurve": "exponential",
                "sustain": 0.1
            },
            "oscillator": {
                "partialCount": 2,
                "partials": [
                    0.030140817901234556,
                    1
                ],
                "phase": 0,
                "type": "custom"
            }
        }).chain(distortion, delay),
        'note': 'C2'
    }
];


for (let i = 0; i < synths.length; i++) {
    synths[i].sequence = new Tone.Sequence(
        function (time, note) {
            synths[i].synth.triggerAttackRelease(note, "2hz", time);
        },
        getSeq(i),
        "8n"
    );
    synths[i].sequence.start();
}

let coolpitch = "B2";
cool.triggerAttack(coolpitch);
Tone.Transport.bpm.value = 90

let playing = false;
document.querySelector("#start").addEventListener('click', () => {
    synths[0].synth.triggerAttackRelease("C4", "1");
    if (!playing) {
        Tone.Transport.start();
    } else {
        Tone.Transport.stop();
    }
    playing = !playing;
})

const socket = io();

socket.on('sequencer', (data) => {
    let n = null;
    if (data.state) {
        n = synths[data.row].note
    }
    synths[data.row].sequence.events[data.column] = n
});

socket.on('position', (data) => {
    gain.gain.rampTo(data.y, 0.1);
    const gam = ['A1', 'C2', 'D2', 'E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A4']
    let newpitch = gam[parseInt(data.x * 10)]
    if (coolpitch != newpitch) {
        cool.triggerAttack(newpitch);
        coolpitch = newpitch;
    }
});

socket.on('dial1', (data) => {
    //  bpm
    Tone.Transport.bpm.value = data * 200 + 60;
});

socket.on('dial2', (data) => {
    distortion.distortion = data * 2.0;
});

socket.on('dial3', (data) => {
    delay.wet.value = data
});

socket.on('slider', (data) => {
    // slider 1 - kick pitchdecay
    let val = ((1 / (0.01 + data[0] / 8))).toString() + "hz"
    synths[0].synth.pitchDecay = val

    // slider 2 - snare harmony
    synths[1].synth.harmonicity = data[1] * 9 + 0.1

    // slider 3 -
    let p = synths[2].synth.oscillator.partials
    p[3] = data[2] * 2
    synths[2].synth.oscillator.partials = p

    // slider 4 - pitch 
    updatePitch(3, Tone.Frequency(data[3] * 50.0 + 20, "midi").toNote())
});