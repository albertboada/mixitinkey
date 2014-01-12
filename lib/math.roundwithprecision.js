/**
 * Extends the Javascript Math object by adding a method for rounding
 * with precision.
 *
 * @author  Albert Boada Flaquer < albert.boada.flaquer at gmail dot com >
 * @version 1.0.0
 * @link    https://github.com/albertboada
 * @license MIT
 */

(function (Math) {

if (!Math.roundwithprecision) {

    /**
     *
     */
    Math.roundwithprecision = function (num, precision)
    {
        var factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    }
}

} (window.Math));