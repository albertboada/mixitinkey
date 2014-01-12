var Key = function (key_data)
{   var that = this;

    this.id       = key_data.id;
    this.name     = key_data.name;
    this.rootnote = null;
    this.mode     = null;
    this.scale    = [];

    _init();

    function _init()
    {
        _initRootnote();
        _initMode();
        _initScale();
    }

    function _initRootnote()
    {
        that.rootnote = Dbms.table("Notes").getByPk(key_data.rootnote_id);
    }

    function _initMode()
    {
        that.mode = Dbms.table("Modes").getByPk(key_data.mode_id);
    }

    function _initScale()
    {
        var scale_pattern = that.mode.pattern,
            notes         = Dbms.table("Notes").getAll(),
            notes_indexes = Dbms.table("Notes").getIndexes();

        that.scale.push(that.rootnote);

        notes_pointer = notes_indexes[that.rootnote.id];

        for (var i = 0; i < scale_pattern.length - 1 /* -1 bc we'll not index the 8th */; i++) {
            var step = scale_pattern.charAt(i);
            if ("W" == step) {
                notes_pointer += 2;
            } else if ("H" == step) {
                notes_pointer += 1;
            }
            if (notes_pointer > notes.length - 1) {
                notes_pointer = notes_pointer % notes.length;
            }
            that.scale.push(notes[notes_pointer]);
        }
    }
};

/**
 * [transpose description]
 * @param  {[type]} number_of_semitomes [description]
 * @return {[type]}                     [description]
 */
Key.prototype.transpose = function (number_of_semitomes)
{
    var altered_rootnote = this.rootnote.transpose(number_of_semitomes);
    return Dbms.table("Keys").getByRootAndMode(altered_rootnote, this.mode);
}

/**
 * [compare description]
 * @param  {[type]} key1 [description]
 * @param  {[type]} key2 [description]
 * @return {[type]}      [description]
 */
Key.compare = function (key1, key2)
{
    var disonances  = 0,
        consonances = 0,
        found,
        note;

    if (key1.id == key2.id) {
        return [key1.scale.length, 0];
    }

    /**
     * Base on key notes differences.
     *
     * C Major:       C    D    E    F    G    A    B    C    D    E    F    G    A    B    C
     *
     * penta C Major: C    D    E         G    A                                     // 0 disonances
     * A Minor:                                A    B    C    D    E    F    G    A  // 0 disonances
     * G Major:                           G    A    B    C    D    E     F# G        // 1 disonance
     * E Minor:                 E      F# G    A    B    C    D    E                 // 1 disonance
     * C Minor:       C    D D#      F    G G#   A#      C                           // 3 disonances
     * E Major:                 E      F#   G# A    B      C#   D# E                 // 4 disonances
     */

    if (key1.scale.length < key2.scale.length) {
        //compare key1 notes against key2
        _arrays_matches(key1.scale, key2.scale,
            function () { consonances++; },
            function () { disonances++; }
        );
    }
    else {
        //compare key2 notes against key1
        _arrays_matches(key2.scale, key1.scale,
            function () { consonances++; },
            function () { disonances++; }
        );
    }

    return [consonances, disonances];


    function _arrays_matches(array1, array2, match_callback, nomatch_callback)
    {
        var found;

        for (var i = 0; i < array1.length; i++) {
            element1 = array1[i];
            found = false;
            for (var j = 0; j < array2.length; j++) {
                element2 = array2[j];
                if (element1 == element2) {
                    found = true;
                }
            }
            if (found) {
                match_callback();
            }
            else {
                nomatch_callback();
            }
        }
    }
}