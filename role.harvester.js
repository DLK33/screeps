var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 50;}});

        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
                                
        var dump = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
                                
	    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) { //(creep.getActiveBodyparts(WORK)*2)
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        } else if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                } 
            } else if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                } 
            } else if(dump) {
                if(creep.transfer(dump[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dump[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            }
        };

module.exports = roleHarvester;
