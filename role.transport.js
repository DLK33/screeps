var roleTransport = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        //var sources = creep.room.find(FIND_DROPPED_RESOURCES && FIND_TOMBSTONES && FIND_SOURCES);
            var sources = creep.pos.findClosestByRange(FIND_SOURCES); 
            var dropped_resources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            var tombstones = creep.pos.findClosestByRange(FIND_TOMBSTONES);
    
            if(dropped_resources > 0) { //Have creep move to and pickup dropped resources
                if(creep.harvest(dropped_resources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped_resources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                }
            } else if(tombstones > 0) {  //go pickup energy from tombstones
                if(creep.harvest(tombstones[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tombstones[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                } 
            } else if(sources > 0) {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
}};

module.exports = roleTransport;