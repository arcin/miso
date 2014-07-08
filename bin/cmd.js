#!/usr/bin/env node
var path = require('path'),
    lib = path.join(__dirname, '../lib'),
    list = require(lib + '/gall'),
    create = require(lib + '/gspawn'),
    destroy = require(lib + '/gkill'),
    command = process.argv[2],
    target = process.argv[3];

if (command === 'list' || command === 'l') list();
if (command === 'create' || command === 'c') create(target);
if (command === 'delete' || command === 'd') destroy(target);
