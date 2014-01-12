var notes = [];
for (var i = 0; i < notes_json.length; i++) {
    var note = notes_json[i];
    note = new Note(note);
    notes.push(note);
}
notesTable.setData(notes);

var modes = [];
for (var i = 0; i < modes_json.length; i++) {
    var mode = modes_json[i];
    mode = new Mode(mode);
    modes.push(mode);
}
modesTable.setData(modes);

var keys = [];
for (var i = 0; i < keys_json.length; i++) {
    var key = keys_json[i];
    key = new Key(key);
    keys.push(key);
}
/*for (i in keys) {
    var key = keys[i];
    key.rootkey  = keys[key.rootkey_id];
    key.mode     = modes[key.mode_id];
}*/
keysTable.setData(keys);

var tracks = [];
for (var i=0; i<tracks_json.length; i++) {
    var track = tracks_json[i];
    track = new Track(track);
    //track.scale = scales[track.scale_id];
    tracks.push(track);
}
tracksTable.setData(tracks);