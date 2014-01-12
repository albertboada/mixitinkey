var Selectbox = function (options, indexes)
{
    this.options    = [];       // ??
    this.indexes    = {};
    this.selected   = null;     // string
    this.visible    = true;

    this.setOptions = function (options, indexes)
    {
        this.options = [];
        if (typeof options !== "undefined") {
            this.options = [];

            this.options = options;
        }

        this.indexes = {};
        if (typeof indexes !== "undefined") {
            this.indexes = indexes;
        }

        this.selected   = null;
    };

    this.setOptions(options, indexes);

    this.current = function ()
    {
        var exists = (
            this.options != null
            && typeof this.indexes[this.selected] !== "undefined"
            && typeof this.options[this.indexes[this.selected]] !== "undefined"
        );
        if (exists) {
            var real_index = this.indexes[this.selected];
            return this.options[real_index];
        }

        return null;
    };

    this.isVisible = function ()
    {
        return this.visible;
    };
};