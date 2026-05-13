//var generateName = require('sillyname');

import generateName from 'sillyname';
var sillyName = generateName();

console.log(`My name is ${sillyName}`);

import {randomSuperhero} from 'superheroes';
var mySuperHeroName = randomSuperhero();

console.log(`My favorite super hero is ${mySuperHeroName}!`);