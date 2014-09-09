#!/usr/bin/env node

var ieify = require('./');

process.stdin.pipe(ieify()).pipe(process.stdout);