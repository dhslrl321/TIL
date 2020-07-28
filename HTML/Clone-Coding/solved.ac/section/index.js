
var obj = {
    outer: function () {
        console.log(this);

        var innerFunc = function () {
            console.log(this);
        }
        innerFunc();

        var self = this;
        var innerFunc2 = function () {
            console.log(self);
        }
    }
}

obj.outer();