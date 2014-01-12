/****************************************************
*   DATA
****************************************************/

var notes_json = [{
        id: 1,
        names: ["C"]
    }, {
        id: 2,
        names: ["C#", "Db"]
    }, {
        id: 3,
        names: ["D"]
    }, {
        id: 4,
        names: ["D#", "Eb"]
    }, {
        id: 5,
        names: ["E"]
    }, {
        id: 6,
        names: ["F"]
    }, {
        id: 7,
        names: ["F#", "Gb"]
    }, {
        id: 8,
        names: ["G"]
    }, {
        id: 9,
        names: ["G#", "Ab"]
    }, {
        id: 10,
        names: ["A"]
    }, {
        id: 11,
        names: ["A#", "Bb"]
    }, {
        id: 12,
        names: ["B"]
    }
];

var modes_json = [{
        id:      1,
        name:    "Major", // Ionian(I)
        pattern: "WWHWWWH"
    }, {
        id:      2,
        name:    "Natural Minor", // Aeolian(VI)
        pattern: "WHWWHWW"
    }
];

var keys_json = [{
        id         : 1,
        name       : "C Major",
        rootnote_id : 1,
        mode_id    : 1
    }, {
        id         : 2,
        name       : "C minor",
        rootnote_id : 1,
        mode_id    : 2
    }, {
        id         : 3,
        name       : "Db Major",
        rootnote_id : 2,
        mode_id    : 1
    }, {
        id         : 4,
        name       : "C# minor",
        rootnote_id : 2,
        mode_id    : 2
    }, {
        id         : 5,
        name       : "D Major",
        rootnote_id : 3,
        mode_id    : 1
    }, {
        id         : 6,
        name       : "D minor",
        rootnote_id : 3,
        mode_id    : 2
    }, {
        id         : 7,
        name       : "Eb Major",
        rootnote_id : 4,
        mode_id    : 1
    }, {
        id         : 8,
        name       : "Eb/D# minor",
        rootnote_id : 4,
        mode_id    : 2
    }, {
        id         : 9,
        name       : "E Major",
        rootnote_id : 5,
        mode_id    : 1
    }, {
        id         : 10,
        name       : "E minor",
        rootnote_id : 5,
        mode_id    : 2
    }, {
        id         : 11,
        name       : "F Major",
        rootnote_id : 6,
        mode_id    : 1
    }, {
        id         : 12,
        name       : "F minor",
        rootnote_id : 6,
        mode_id    : 2
    }, {
        id         : 13,
        name       : "Gb/F# Major",
        rootnote_id : 7,
        mode_id    : 1
    }, {
        id         : 14,
        name       : "F# minor",
        rootnote_id : 7,
        mode_id    : 2
    }, {
        id         : 15,
        name       : "G Major",
        rootnote_id : 8,
        mode_id    : 1
    }, {
        id         : 16,
        name       : "G minor",
        rootnote_id : 8,
        mode_id    : 2
    }, {
        id         : 17,
        name       : "Ab Major",
        rootnote_id : 9,
        mode_id    : 1
    }, {
        id         : 18,
        name       : "G# minor",
        rootnote_id : 9,
        mode_id    : 2
    }, {
        id         : 19,
        name       : "A Major",
        rootnote_id : 10,
        mode_id    : 1
    }, {
        id         : 20,
        name       : "A minor",
        rootnote_id : 10,
        mode_id    : 2
    }, {
        id         : 21,
        name       : "Bb Major",
        rootnote_id : 11,
        mode_id    : 1
    }, {
        id         : 22,
        name       : "Bb minor",
        rootnote_id : 11,
        mode_id    : 2
    }, {
        id         : 23,
        name       : "B Major",
        rootnote_id : 12,
        mode_id    : 1
    }, {
        id         : 24,
        name       : "b minor",
        rootnote_id : 12,
        mode_id    : 2
    }
];

var tracks_json = [{
        author   : "Soundprank",
        title    : "The Far Side",
        bpm      : 128,
        key_id : 8, //"d#"
        //cover    : "http://www.anjunabeats.com/images/releases/ANJDEE-094.jpg"
        cover    : "img/covers/ANJDEE-094.jpg"
    }, {
        author   : "Above & Beyond",
        title    : "Can't Sleep (Sonorous Remix)",
        bpm      : 128,
        key_id : 16, //"g"
        cover    : null
    }, {
        author   : "P.O.S.",
        title    : "Gravity (Andrew Bayer & James Grant Remix)",
        bpm      : 126,
        key_id : 2, //"c"
        //cover    : "http://www.anjunabeats.com/images/releases/ANJDEE-149.jpg"
        cover    : "img/covers/ANJDEE-149.jpg"
    }, {
        author   : "OceanLab",
        title    : "Sirens Of The Sea (Sonorous Remix)",
        bpm      : 128,
        key_id : 4, //"d"
        cover    : "http://www.anjunabeats.com/images/releases/ANJCD013.jpg"
    }, {
        author   : "OceanLab",
        title    : "On A Good Day (16 Bit Lolitas Remix)",
        bpm      : 128,
        key_id : 18, //"g#"
        cover    : "http://www.anjunabeats.com/images/releases/ANJCD013.jpg"
    }, {
        author   : "Parker & Hanson",
        title    : "Afterthought",
        bpm      : 126,
        key_id : 14, //"f#"
        //cover    : "http://www.anjunabeats.com/images/releases/ANJ-234.jpg"
        cover    : "img/covers/ANJDEE-149.jpg"
    }, {
        author   : "Oliver Smith",
        title    : "Under The Wire",
        bpm      : 128,
        key_id : 18, //"g#"
        //cover    : "http://www.anjunabeats.com/images/releases/ANJDEE-153.jpg"
        cover    : "img/covers/ANJCD013.jpg"
    }, {
        author   : "Boom Jinx & Andrew Bayer",
        title    : "By All Means",
        bpm      : 128,
        key_id : 18, //"g#"
        //cover    : "http://www.anjunabeats.com/images/releases/ANJDEE-071.jpg"
        cover    : "img/covers/ANJDEE-071.jpg"
    }, {
        author   : "Aspekt",
        title    : "Hi Jack",
        bpm      : 134,
        key_id : 22, //"bb"
        //cover    : "http://www.anjunabeats.com/images/releases/ANJDEE-071.jpg"
        cover    : "img/covers/ANJCD013.jpg"
    },
];