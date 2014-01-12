/**
 * [Mix description]
 * @param {[type]} track1 [description]
 * @param {[type]} track2 [description]
 */
var Mix = function (track1, track2)
{
    var _self = this;

    this.trackOut; // Track
    this.trackIn; // Track

    this.bpm;
    this.bpmChange;
    this.pitchChange;         // Pitch percent change
    this.trackInAlteredKey;   // Actual trackIn's key due to pitch variation
    this.trackInTransposes;   // Actual trackIn's key due to pitch variation
    this.consonanceRatio;     // Harmonic score of the mix
    this.disonances;
    this.trackInKeyDeviation; // How away the mix is from a pure key <- NOT SURE IF I KNOW HOW TO CALC
    this.overallScore;        // Overall score of the mix

    /**
     *
     */
    this.update = function ()
    {
        _setBpmChange();
        _setPitchPctChange();
        _setHarmonicAlterations();
        _setHarmonicScore();
        _setOverallScore();
    }

    _init();

    function _init()
    {
        _self.trackOut = track1;
        _self.trackIn  = track2;

        _self.update();
    }

    function _setBpmChange()
    {
        _self.bpmChange = _self.trackIn.bpmChangeToMatch(_self.trackOut);
    }

    function _setPitchPctChange()
    {
        _self.pitchChange = _self.trackIn.pitchChangeToMatch(_self.trackOut);
    }

    function _setHarmonicAlterations()
    {
        trackIn_altered_key = _self.trackIn.keyApplyingChange(_self.pitchChange);

        _self.trackInAlteredKey   = trackIn_altered_key[0];
        _self.trackInKeyDeviation = trackIn_altered_key[1];
        _self.trackInTransposes   = trackIn_altered_key[2];
    }

    function _setHarmonicScore()
    {
        var harmonic_factor,
            trackOut_key = _self.trackOut.key,
            trackIn_key  = _self.trackInAlteredKey,
            consonances;

        consonances = Key.compare(trackOut_key, trackIn_key);

        _self.disonances  = consonances[1];
        consonances = consonances[0];

        _self.consonanceRatio = consonances / (consonances + _self.disonances);
    }

    function _setOverallScore()
    {
        //@todo
        return;

        _self.consonanceRatio      //0.57 | 57
        _self.trackInKeyDeviation; //0.13 | 13

        // dev   0 => +1
        // dev  25 => +0.5
        // dev  50 => +0
        // dev  75 => -0.5
        // dev 100 => -1
        // (0.57 + (0.1 - (0.13*0.1))) / 1.1 =
    }

    function _roundWith2Decimals(val)
    {
        return Math.roundwithprecision(val, 2);
    }
};