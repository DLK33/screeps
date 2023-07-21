var roleHarvester = require('role.harvester');
var roleTransport = require('role.transport');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleBigBuild = require('role.bigbuild');

module.exports.loop = function () {

    var tower = Game.getObjectById('64b610a4602baac304f31fb9');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    //console.log(Game.spawns["Spawn1"].store.getUsedCapacity(RESOURCE_ENERGY));

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var bigbuild = _.filter(Game.creeps, (creep) => creep.memory.role == 'bigbuild');
    
    //console.log('BigBuilds: ' + bigbuild.length);
    //console.log('Upgraders: ' + upgraders.length);
    
    if(harvesters.length < 6 && Game.rooms["W29N45"].energyAvailable >= 700) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        console.log('Harvesters: ' + harvesters.length);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK,WORK,WORK,WORK,MOVE,MOVE], newName, 
        {memory: {role: 'harvester'}});
    } else {
        if(transporters.length < 0 && Game.rooms["W29N45"].energyAvailable >= 200) {
            var newName = 'Transport' + Game.time;
            console.log('Spawning new transporter: ' + newName);
            console.log('Transporters: ' + harvesters.length);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'transport'}});
        } else {
            if(bigbuild.length < 2 && Game.rooms["W29N45"].energyAvailable >= 600) {
                var newName = 'BigBuilder' + Game.time;
                console.log('Spawning new BigBuilder: ' + newName);
                console.log('BigBuilds: ' + bigbuild.length);
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, 
                {memory: {role: 'bigbuild'}});     
            } else {
                if(upgraders.length < 6 && Game.rooms["W29N45"].energyAvailable >= 800) {
                    var newName = 'Upgrader' + Game.time;
                    console.log('Spawning new upgrader: ' + newName);
                    console.log('Upgraders: ' + upgraders.length);
                    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'upgrader'}});
                } else {
                    if(builders.length < 3 && Game.rooms["W29N45"].energyAvailable >= 750) {
                        var newName = 'Builder' + Game.time;
                        console.log('Spawning new builder: ' + newName);
                        console.log('Builders: ' + builders.length);
                        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
                        {memory: {role: 'builder'}});
                    }
                }
            }
        }
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'transport') {
            roleTransport.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'bigbuild') {
            roleBigBuild.run(creep);
        }
    }
}