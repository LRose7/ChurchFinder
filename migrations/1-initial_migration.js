'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "churches", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-12-05T00:12:07.755Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "churches",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {

            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
