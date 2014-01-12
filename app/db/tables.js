/***********************************************
*   DATA TABLES Definition
***********************************************/
var notesTable = new DbmsTable("Notes");

/**
 * @todo move to Note? almenys el module..?
 */
notesTable.getNext = function (id, times)
{
    var next_id = id + times; // 11 - 11 = 0
                              // 11 - 5 = 4
                              // 11 + 1 = 12

    if (next_id > this.data.length || next_id < 0) {
        next_id = next_id.mod(this.data.length);
    }

    if (next_id == 0) {
        next_id = this.data.length;
    }

    return this.getByPk(next_id);
};
Dbms.addTable(notesTable);

var modesTable = new DbmsTable("Modes");
Dbms.addTable(modesTable);

var keysTable = new DbmsTable("Keys", "id", [], {
    "index1": [["rootnote", "id"], ["mode", "id"]]
});
keysTable.getByRootAndMode = function (rootnote, mode)
{
    console.log(rootnote);
    console.log(mode);
    return this.getByIndex("index1", rootnote.id+"-"+mode.id);
};
Dbms.addTable(keysTable);

var tracksTable = new DbmsTable("Tracks");
Dbms.addTable(tracksTable);