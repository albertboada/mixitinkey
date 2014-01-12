var SetCtrl = function ($scope)
{
    var self = this;

    $scope.mastertempo = false;

    $scope.trackSelectbox = new Selectbox(
        Dbms.table("Tracks").getAll(),
        Dbms.table("Tracks").getIndexes()
    ); // Selecbox

    $scope.set = new Set();

    $scope.firsttrack = null;

    /**
     * Init for testing
     */
    _addTrack(Dbms.table("Tracks").getByPk(6));
    _addTrack(Dbms.table("Tracks").getByPk(9));
    _addTrack(Dbms.table("Tracks").getByPk(6));
    _addTrack(Dbms.table("Tracks").getByPk(7));
    _addTrack(Dbms.table("Tracks").getByPk(8));
    _addTrack(Dbms.table("Tracks").getByPk(3));
    _addTrack(Dbms.table("Tracks").getByPk(2));

    $scope.addNewTrack = function ()
    {
        _addTrack($scope.trackSelectbox.current());
    };

    function _addTrack(track)
    {
        var is_first_track,
            haz_prev_track,
            trackOut,
            trackIn,
            new_mix;

        is_first_track = !($scope.set.length > 0);
        if (is_first_track && !$scope.firsttrack) {
            $scope.firsttrack = track;
        } else {
            trackIn = track;
            if (!trackIn) { return; }

            console.log($scope.set.mixes);
            haz_prev_mix = $scope.set.mixes.length > 0;
            if (haz_prev_mix) {
                trackOut = $scope.set.mixes[$scope.set.mixes.length - 1].trackIn;

            } else {
                trackOut = $scope.firsttrack;
            }
            console.log(trackOut);
            console.log(trackIn);
            new_mix = new Mix(trackOut, trackIn);

            $scope.set.add(new_mix);
        }
    }

    /*
    _this.__initializeEvents = function ()
    {
        _this.__watchClothesAmountChanges();
    };

    _this.__watchClothesAmountChanges = function ()
    {
        $scope.$watch(
            function () { return $scope.cart.clothes.length; },
            function (new_length, old_length) {
                //console.log("Cart changed length!");
                $scope.cart.recalculate();
            }
        );
    }

    _this.__initializeEvents();
    */
};