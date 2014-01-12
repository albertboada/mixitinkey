var Set = function (mixes)
{
    this.mixes = typeof mixes == "undefined" ? [] : mixes;  // Array(Mix)
    this.total = null;
};

Set.prototype.add = function (mix)
{
    this.mixes.push(mix);
};

Set.prototype.remove = function (index)
{
    this.mixes.splice(index, 1);
};