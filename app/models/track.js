/**
 * [Track description]
 * @param {[type]} data [description]
 */
var Track = function (track_data)
{   var that = this;

    this.id     = null;
    this.author = track_data.author;
    this.title  = track_data.title;
    this.bpm    = track_data.bpm;
    this.cover  = track_data.cover;

    this.key    = null;

    _init();

    /*private */function _init()
    {
        _initKey();
    }

    /*private */function _initKey()
    {
        that.key = Dbms.table("Keys").getByPk(track_data.key_id);
    }

};

Track.prototype.bpmChangeToMatch = function (other_track)
{
    return this.bpmChangeToMatchBpm(other_track.bpm);
}

Track.prototype.bpmChangeToMatchBpm = function (new_bpm)
{
    return  new_bpm - this.bpm;
}

Track.prototype.pitchChangeToMatch = function (other_track)
{
    return this.pitchChangeToMatchBpm(other_track.bpm);
}

Track.prototype.pitchChangeToMatchBpm = function (new_bpm)
{
    return RelativeChange.Raw.calculate(this.bpm, new_bpm);
}

Track.prototype.keyAtBpm = function (new_bpm)
{
    var pitch_change = this.pitchChangeToMatchBpm(new_bpm);
    return this.keyApplyingChange(pitch_change);
}

Track.prototype.keyApplyingChange = function (pitch_change)
{
    var pitch_multiplier   = pitch_change.multiplier(),
        pitch_change_value = pitch_change.val(),

        /**
         * 1 octave = 12 intervals (assuming equal-tempered Chromatic scale)
         */
        octave_intervals = 12,

        /**
         * Doubling a note's frequency (pitching it up 100% (x2 speed))
         * transposes it +1 octave (12 intervals). Given this, we can calculate
         * the percent change in frequency (and hence in pitch) needed for
         * transposing any note 1 semitone up:
         * +1 interval (semitone) => +(2^(1/12))% frequency|pitch
         *
         * Halving a note's frequency (pitching it down 50% (x0.5 speed))
         * transposes it -1 octave (-12 intervals). Given this, we can calculate
         * the percent change in frequency (and hence in pitch) needed for
         * transposing any note 1 semitone down:
         * -1 interval (semitone) => -(0.5^(1/12))% frequency|pitch
         */
        multiplier_for_semitone_up   = Math.pow(2, 1/octave_intervals);
        //multiplier_for_semitone_down = Math.pow(0.5, 1/octave_intervals);

        //pct_change_for_semitone_up   = (multiplier_for_semitone_up - 1) * 100,
        //pct_change_for_semitone_down = (multiplier_for_semitone_down - 1) * 100,

        /**
         * @todo explain this
         *                v
         */
        /*factor_semitone_up_boundary   = Math.pow(2, 1/(octave_intervals * 2)),
        factor_semitone_down_boundary = Math.pow(0.5, 1/(octave_intervals * 2)),

        pct_change_semitone_up_boundary   = (factor_semitone_up_boundary - 1) * 100,
        pct_change_semitone_down_boundary = (factor_semitone_down_boundary - 1) * 100;*/

    console.log(multiplier_for_semitone_up);//, multiplier_for_semitone_down);
    //console.log(pct_change_for_semitone_up, pct_change_for_semitone_down);
    //console.log(pct_change_semitone_up_boundary, pct_change_semitone_down_boundary);

    if (pitch_change_value == 0) {
        // Not a single key alteration was given!
        return [this.key, 0, 0];
    }
    else {
        var num_of_full_transposes = 0,
            num_of_transposes      = 0,
            deviation;

        console.log("Pitch change: ");
        console.log(pitch_change_value);

        /**
         * In order to know the number of changed semitones resulting from applying
         * the "pitch_change", we have to calculate how many times the
         * "multiplier_for_semitone_up" is applied. In other words, how many
         * applications of "multiplier_for_semitone_up"s is "pitch_multiplier".
         *
         * f' = fº * multiplier_for_semitone_up * multiplier_for_semitone_up * ...
         * f' = fº * (multiplier_for_semitone_up ^ x)
         *
         * multiplier_for_semitone_up ^ x = pitch_multiplier
         *
         * x = log                            (pitch_multiplier)
         *        [multiplier_for_semitone_up]
         *
         * x = # of transpositions
         */
        num_of_transposes = Math.log(pitch_multiplier.val()) / Math.log(multiplier_for_semitone_up);

        num_of_full_transposes = Math.floor(Math.abs(num_of_transposes));
        if (num_of_transposes < 0) {
            num_of_full_transposes = -(num_of_full_transposes);
        }

        console.log(num_of_full_transposes);
        deviation = num_of_transposes - num_of_full_transposes;

        /**
         * @todo refactor to `precision instead of `deviation`
         *
         * round key
         *
         * round deviation
         * 0       0.25      0.5      0.75     1
         * 0       0.5       1                        // x2
         *                   0        0.5      1      // -0.5 * 2
         */
        if (Math.abs(deviation) > 1/2) {
            if (deviation > 0) {
                num_of_full_transposes++;
                deviation_when_rounded = -1 + (deviation - 1/2) * 2;
            } else {
                num_of_full_transposes--;
                deviation_when_rounded = 1 + (deviation + 1/2) * 2;
            }
        }
        else {
            deviation_when_rounded = deviation * 2;
        }

        altered_key = this.key.transpose(num_of_full_transposes);

        return [altered_key, deviation_when_rounded, num_of_full_transposes];
    }
};