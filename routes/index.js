'use strict';

module.exports = function (app) {
    require("./web")(app);
    require("./debug")(app);
    require("./admin")(app);
};