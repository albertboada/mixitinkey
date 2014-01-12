/*******************************************************************
*   RELATIONAL DB SIMULATOR FOR JS OBJECTS :)
*       Limitations:
*       - can't add more rows to an already filled table (if necessary, refill the whole table via setData)
*       - rows inside a table can't be deleted
*******************************************************************/

var DbmsTable = function (name, primary_key, data, indexes)
{
    this.name         = name;
    this.data         = []; // Array
    this.indexes      = {}; // AssocArray
    //this.primaryKey   = "id";
    this.indexes_defs = {"_PK_": "id"};

    this.setData  = function (data)
    {
        this.data = data;
        this.__doIndexData();
    };

    if (typeof primary_key !== "undefined") {
        this.indexes_defs["_PK_"] = primary_key;
    }

    if (typeof indexes != "undefined") {
        for (index_name in indexes) {
            this.indexes_defs[index_name] = indexes[index_name];
        }
    }

    if (typeof data !== "undefined") {
        this.setData(data);
    }
};
DbmsTable.prototype.getAll = function ()
{
    return this.data;
};
DbmsTable.prototype.getIndexes = function (which)
{
    if (typeof which == "undefined") {
        var which = "_PK_";
    }
    return this.indexes[which];
};
DbmsTable.prototype.getByPk = function (pk)
{
    return this.getByIndex("_PK_", pk);
};
DbmsTable.prototype.getByIndex = function (index_name, index_value)
{
    var item = null;
    if (typeof this.indexes[index_name][index_value] !== "undefined") {
        var real_index = this.indexes[index_name][index_value];
        if (typeof this.data[real_index] !== "undefined") {
            item = this.data[real_index];
        }
    }

    return item;
};
DbmsTable.prototype.__doIndexData = function ()
{
    for (k in this.data) {
        for (index_name in this.indexes_defs) {
            var index     = null,
                index_def = this.indexes_defs[index_name];
            if (!this.__isMultipleIndex(index_def)) {
                if (!this.__isDeepIndex(index_def)) {
                    var is_valid_index = (typeof this.data[k][index_def] != "undefined");
                    if (!is_valid_index) { continue; }
                    index = this.data[k][index_def];
                    if (index_name == "_PK_") {
                        var needs_autogenerate = (index == null);
                        if (needs_autogenerate) {
                            index                   =
                            this.data[k][index_def] = parseInt(k) + 1;
                        }
                    }
                }
                else {
                    // @todo
                }
            }
            else {
                if (!this.__isDeepIndex(index_def)) {
                    // @todo
                }
                else {
                    var index_fields = [];
                    for (j = 0; j < index_def.length; j++) { // iterate through the N fields
                        var index_field_def = index_def[j];
                        var index_model = index_field_def[0],
                            index_field = index_field_def[1];
                        var is_valid_index = (
                                this.data[k][index_model][index_field] !== "undefined"
                                && this.data[k][index_model][index_field] != null
                            );
                        if (is_valid_index) {
                            index_fields.push(this.data[k][index_model][index_field]);
                        }
                    }
                    index = index_fields.join("-");
                }
            }

            if (typeof this.indexes[index_name] == "undefined") {
                this.indexes[index_name] = {};
            }
            this.indexes[index_name][index] = parseInt(k);
        }
    }
/*
    //for (k = 0; k < this.data.length; k++) {
        var id = null;
        if (!this.__isMultiplePk()) {
            var pk_field = this.primaryKey;
            if (!this.__isDeepPk()) {
                ////console.log("no multiple, no deep");
                var already_haz_id = (
                    typeof this.data[k][pk_field] !== "undefined"
                    && this.data[k][pk_field] != null
                );
                if (already_haz_id) {
                    id = this.data[k][pk_field];
                } else {
                    id                     =
                    this.data[k][pk_field] = k+1;
                }
            } else {
                ////console.log("no multiple, yes deep");
                // @ TODO
            }
        } else {
            var pk_fields = this.primaryKey;
            if (!this.__isDeepPk()) {
                // @ TODO
            }
            else {
                ////console.log("multiple deep");
                var ids = [];
                for (j=0; j<pk_fields.length; j++) {    // iterate through the N fields
                    var pk_field = pk_fields[j]
                    var inner_model = pk_field[0];
                    var inner_pk    = pk_field[1];

                    var valid_pk = (
                        this.data[k][inner_model][inner_pk] !== "undefined"
                        && this.data[k][inner_model][inner_pk] != null
                    );
                    if (valid_pk) {
                        ids.push(this.data[k][inner_model][inner_pk]);
                    }
                }

                id = ids.join("-");
            }
        }

        this.indexes[id] = parseInt(k);
    }
*/
};
DbmsTable.prototype.__isMultipleIndex = function (index_def)
{
    return (
        typeof index_def === "object"
        && index_def instanceof Array
    );
};
DbmsTable.prototype.__isDeepIndex = function (index_def)
{
    if (this.__isMultipleIndex(index_def)) {
        return (
            typeof index_def === "object"
            && index_def instanceof Array
            && typeof index_def[0] == "object"
            && index_def instanceof Array
        );
    } else {
        return (
            typeof index_def === "object"
            && index_def instanceof Array
        );
    }
};

var Dbms =
{
    tables: {},     // AssocArray(DbmsTable)

    table: function (table_name)
    {
        var table = null;
        if (typeof this.tables[table_name] !== "undefined") {
            table = this.tables[table_name];
        }
        return table;
    },

    addTable: function (table)
    {
        this.tables[table.name] = table;
        return table;
    }
};