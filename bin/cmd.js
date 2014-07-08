#!/usr/bin/env node
var path = require('path'),
    lib = path.join(__dirname, '../lib'),
    repokit = require(lib + '/repokit'),
    command = process.argv[2],
    target = process.argv[3];

if (command === 'list' || command === 'l') repokit.list();
if (command === 'create' || command === 'c') repokit.create(target);
if (command === 'destroy' || command === 'd') repokit.destroy(target);