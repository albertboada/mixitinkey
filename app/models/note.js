/**
 * [Note description]
 */

var Note = function (note)
{
    this.id     = note.id;
    this.names  = note.names;
};

/**
 * [transpose description]
 * @param  {[type]} number_of_semitomes [description]
 * @return {[type]}                     [description]
 */
Note.prototype.transpose = function (number_of_semitomes)
{
    return Dbms.table("Notes").getNext(this.id, number_of_semitomes);
};