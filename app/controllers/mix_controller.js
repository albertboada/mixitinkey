var MixCtrl = function ($scope)
{
    // $scope.mix <- injected by ng-repeat context :)

    $scope.bpm_change;
    $scope.pitch_pct_change;
    $scope.trackIn_key_deviation;
    $scope.harmonic_deviation;
    $scope.trackIn_transposes;
    $scope.harmonic_score;
    $scope.harmonic_cool_message;

    $scope.showInfo = false;

    $scope.scoreClass = "bad";

    _initAndDecorateBpmChange();
    _initAndDecoratePitchPctChange();
    _initAndDecorateTrackInKeyDeviation();
    _initAndDecorateTrackInTransposes();
    _initAndDecorateHarmonicDeviation();
    _initAndDecorateHarmonicScore();

    $scope.openInfo = function ($event)
    {
        if(!$scope.showInfo) {
            $scope.showInfo = true;
        }

        $event.stopPropagation();
    }

    $scope.closeInfo = function ($event)
    {
        $scope.showInfo = false;

        $event.stopPropagation();
    }

    function _initAndDecorateBpmChange()
    {
        var bpm_change = Math.roundwithprecision($scope.mix.bpmChange, 3);

        if (bpm_change > 0) {
            bpm_change = "+"+bpm_change;
        }

        $scope.bpm_change = bpm_change;
    }

    function _initAndDecoratePitchPctChange()
    {
        var pitch_pct_change = Math.roundwithprecision($scope.mix.pitchChange.percentage().val(), 3);

        if (pitch_pct_change > 0) {
            pitch_pct_change = "+"+pitch_pct_change;
        }

        $scope.pitch_pct_change = pitch_pct_change+"%";
    }

    function _initAndDecorateTrackInKeyDeviation()
    {
        var deviation = Math.roundwithprecision($scope.mix.trackInKeyDeviation * 100, 2);

        $scope.trackIn_key_deviation = deviation+"%";
    }


    function _initAndDecorateTrackInTransposes()
    {
        var transposes = $scope.mix.trackInTransposes;

        if (transposes > 0) {
            transposes = "+"+transposes;
        }

        $scope.trackIn_transposes = transposes;
    }

    function _initAndDecorateHarmonicDeviation()
    {
        var deviation = $scope.mix.trackInKeyDeviation;

        $scope.harmonic_deviation = Math.roundwithprecision(Math.abs(deviation) * 100, 2)+"%";
    }

    function _initAndDecorateHarmonicScore()
    {
        var consonance_ratio = $scope.mix.consonanceRatio;

        if (consonance_ratio == 1) {
            $scope.scoreClass = "perfect";
            $scope.harmonic_cool_message = "Purrfect!";
        } else if (consonance_ratio < 1 && consonance_ratio >= 0.75) {
            $scope.scoreClass = "good";
            $scope.harmonic_cool_message = "Goed!";
        } else if (consonance_ratio < 0.75 && consonance_ratio >= 0.5) {
            $scope.scoreClass = "poor";
            $scope.harmonic_cool_message = "Meh!";
        } else if (consonance_ratio < 0.5) {
            $scope.scoreClass = "bad";
            $scope.harmonic_cool_message = "Awful!";
        }

        $scope.harmonic_score = Math.roundwithprecision(consonance_ratio * 10, 1);
    }

    /*
    $scope.brandSelectbox = new Selectbox(
        Dbms.table("Brands").getAll(),
        Dbms.table("Brands").getIndexes()
    ); // Selecbox
    $scope.categorySelectbox = new Selectbox(
        Dbms.table("Categories").getAll(),
        Dbms.table("Categories").getIndexes()
    ); // Selectbox
    $scope.subcategorySelectbox = new Selectbox(); // Selectbox

    var _this = this;

    $scope.removeCloth = function ()
    {
        if ($scope.cart.clothes.length > 1) {
            $scope.cart.remove($scope.$index);
        }
    };

    _this.__initializeEvents = function ()
    {
        _this.__watchBrandSelectboxChanges();
        _this.__watchCategorySelectboxChanges();
        _this.__watchSubcategorySelectboxChanges();

        _this.__watchModeChanges();
        _this.__watchBrandChanges();
        _this.__watchRankChanges();
        _this.__watchCategoryChanges();
        _this.__watchSubcategoryChanges();
        _this.__watchGainChanges();
    };

    _this.__watchBrandSelectboxChanges = function ()
    {
        $scope.$watch(
            // "cart.clothes[$index].brandSelectbox.selected",
            function () { return $scope.brandSelectbox.selected; },
            function (new_brand_id, old_brand_id) {
                //console.log("Brand Selectbox changed?");
                if (old_brand_id != new_brand_id) {
                    var current_brand = $scope.brandSelectbox.current();
                    if (current_brand != $scope.cloth.brand) {
                        //console.log("Brand Selectbox changed!");
                        $scope.cloth.brand = current_brand;
                    }
                }
            }
        );
    };

    _this.__watchCategorySelectboxChanges = function ()
    {
        $scope.$watch(
            // "cart.clothes[$index].categorySelectbox.selected",
            function () { return $scope.categorySelectbox.selected; },
            function (new_category_id, old_category_id) {
                //console.log("Category Selectbox changed?");
                if (old_category_id != new_category_id) {
                    var current_category = $scope.categorySelectbox.current();
                    if (current_category != $scope.cloth.category) {
                        //console.log("Category Selectbox changed!");
                        $scope.cloth.category = current_category;
                    }
                }
            }
        );
    };

    _this.__watchSubcategorySelectboxChanges = function ()
    {
        $scope.$watch(
            // "cart.clothes[$index].subcategorySelectbox.selected",
            function () { return $scope.subcategorySelectbox.selected; },
            function (new_subcategory_id, old_subcategory_id) {
                //console.log("Subcategory Selectbox changed?");
                if (old_subcategory_id != new_subcategory_id) {
                    //console.log("Subcategory Selectbox changed!");
                    var current_subcategory = $scope.subcategorySelectbox.current();
                    if (current_subcategory != $scope.cloth.subcategory) {
                        $scope.cloth.subcategory = current_subcategory;
                    }
                }
            }
        );
    };

    _this.__watchModeChanges = function ()
    {
        $scope.$watch(
            // "cart.clothes[$index].brand.selected",
            function () { return $scope.cloth.mode; },
            function (new_mode, old_mode) {
                //console.log("Mode changed?");
                if (new_mode != old_mode) {
                    //console.log("Mode changed!");
                    $scope.cloth.recalculateGain();
                }
            }
        );
    };

    _this.__watchBrandChanges = function ()
    {
        $scope.$watch(
            // "cart.clothes[$index].brand.selected",
            function () { return $scope.cloth.brand; },
            function (new_brand, old_brand) {
                //console.log("Brand changed?");
                if (new_brand != old_brand) {
                    //console.log("Brand changed!");
                    var selected_brand = (typeof new_brand.id === "undefined" || new_brand == null) ? null : new_brand.id;
                    $scope.brandSelectbox.selected = selected_brand; // since we're watching cloth.brand's changes, assume this var can be changed via console, so we update the selectbox too :)
                    $scope.cloth.recalculateRank();
                }
            }
        );
    };

    _this.__watchRankChanges = function ()
    {
        $scope.$watch(
            // 'cart.clothes[$index].rank',
            function () { return $scope.cloth.rank; },
            function (new_rank, old_rank) {
                //console.log("Rank changed?");
                if (new_rank != old_rank) {
                    //console.log("Rank changed!");
                    $scope.cloth.recalculateGain();
                }
            }
        );
    };

    _this.__watchCategoryChanges = function ()
    {
        $scope.$watch(
            // 'cart.clothes[$index].category',
            function () { return $scope.cloth.category; },
            function (new_category, old_category) {
                //console.log("Category changed?");
                if (old_category != new_category) {
                    //console.log("Category changed!");
                    var selected_category = (typeof new_category === "undefined" || new_category == null) ? null : new_category.id;
                    $scope.categorySelectbox.selected = selected_category; // since we're watching cloth.brand's changes, assume this var can be changed via console, so we update the selectbox too :)
                    _this.__populateSubcategories();
                }
            }
        );
    };

    _this.__watchSubcategoryChanges = function ()
    {
        $scope.$watch(
            // 'cart.clothes[$index].subcategory',
            function () { return $scope.cloth.subcategory; },
            function (new_subcategory, old_subcategory) {
                //console.log("Subcategory changed?");
                if (new_subcategory != old_subcategory) {
                    //console.log("Subcategory changed!");
                    var selected_subcategory = (typeof new_subcategory === "undefined"  || new_subcategory == null) ? null : new_subcategory.id;
                    $scope.subcategorySelectbox.selected = selected_subcategory; // since we're watching cloth.subcategory's changes, assume this var can be changed via console, so we update the selectbox too :)
                    $scope.cloth.recalculateGain();
                }
            }
        );
    };

    _this.__watchGainChanges = function ()
    {
        $scope.$watch(
            // 'cart.clothes[$index].gain',
            function () { return $scope.cloth.gain; },
            function (newval, oldval) {
                //console.log("Gain changed?");
                var gain_changed = !Range.prototype.equals2(oldval, newval);
                if (gain_changed) {
                    $scope.cart.recalculate();
                }
            },
            true
        );
    };

    _this.__populateSubcategories = function ()
    {
        $scope.cloth.subcategory = null;

        var category = $scope.cloth.category;
        var subcategories_by_category = category.getSubcategories();
        var subcategories_list = subcategories_by_category[0];
        var subcategories_indexes = subcategories_by_category[1];

        $scope.subcategorySelectbox.visible = false;    // ie fix...
        $scope.$apply();                                // ie fix...

        $scope.subcategorySelectbox.setOptions(subcategories_list, subcategories_indexes);

        $scope.subcategorySelectbox.visible = true;     // ie fix...
    };

    _this.__initializeEvents($scope);
    */
};