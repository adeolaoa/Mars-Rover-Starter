class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }
 
 //let commands = [new Command('STATUS_CHECK')];
 //console.log(commands.length);

 module.exports = Command;