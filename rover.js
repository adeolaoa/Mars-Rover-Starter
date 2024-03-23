
class Rover {
   // code here
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   processCommand(command) {
      let result = {};
      switch (command.commandType) {
         case 'MODE_CHANGE':
            this.mode = command.value;
            result.completed = true;
            break;
         case 'STATUS_CHECK':
            result.completed = true;
            result.roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            };
            break;
         case 'MOVE':
            if (this.mode === 'LOW_POWER') {
               result.completed = false;
               result.message = 'Cannot move in LOW_POWER mode';
            } else {
               this.position = command.value; 
               result.completed = true;
            }
            break;
         default:
            result.completed = false;
            result.message = 'Unknown command';
            break;
      }
      return result;
   }

   receiveMessage(message) {
      const results = [];
      for (let command of message.commands) {
         results.push(this.processCommand(command));
      }
      return { message: message.name, results: results };
   }

   // receiveMessage(message){
      
   //    return { message: message.name, results: []};
   //    //return (message.name, message.results);
   //    //return actual.message.name
   // }
   
}

module.exports = Rover;
