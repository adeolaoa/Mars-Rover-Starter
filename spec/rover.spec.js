const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it ('constructor sets position and default values for mode and generatorWatts', function(){


  });
// 8 tests here!
  it ('response returned by receiveMessage contains the name of the messages', function(){
    // Create a new Rover object
    let rover = new Rover(100);
    let name = "jkl";
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message(name, commands);
    // Call the receiveMessage method on the Rover object
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(name);

  });

  // 9 tests here!
  it ('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    // Create a new Rover object
    let rover = new Rover(100);
    let name = "jkl";
    let commands = [];
    let message = new Message(name, commands);
    // Call the receiveMessage method on the Rover object
    let response = rover.receiveMessage(message);
    //expect(response.message).toEqual(commands);
    expect(response.results.length).toBe(message.commands.length);
  })

  // 10 tests here!
  it ('responds correctly to the status check command', function(){
    // Create a new Rover object
    let rover = new Rover(100);
    let name = "jkl";
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message(name, commands);
    // Call the receiveMessage method on the Rover object
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(message.commands.length);

    expect(response.results[0].roverStatus).toBeDefined();

    // Check each property of the roverStatus object for accuracy
    expect(response.results[0].roverStatus.mode).toBe(rover.mode);
    expect(response.results[0].roverStatus.generatorWatts).toBe(rover.generatorWatts);
    expect(response.results[0].roverStatus.position).toBe(rover.position);
  })

  // 11 tests here!
  it ('responds correctly to the mode change command', function(){
    // Create a new Rover object
    let rover = new Rover(100);
    let name = "jkl";
    //let commands = [new Command('MODE_CHANGE'), new Command('LOW_POWER')];
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];

    let message = new Message(name, commands);
    // Call the receiveMessage method on the Rover object
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(message.commands.length);

    // Assert that the result has the correct completed property
    expect(response.results[0].completed).toBe(true);

    // Assert that the rover's mode has been changed correctly
    expect(rover.mode).toBe('LOW_POWER');

  })

  // 12 tests here!
  it ('rresponds with a false completed value when attempting to move in LOW_POWER mode', function(){
    // Create a new Rover object
    let rover = new Rover(100);
    rover.mode = 'LOW_POWER';

    let name = "jkl";
    //let commands = [new Command('MODE_CHANGE'), new Command('LOW_POWER')];
    let commands = [new Command('MOVE', 50)];

    let message = new Message(name, commands);
    // Call the receiveMessage method on the Rover object
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(message.commands.length);

    // Assert that the result has the correct completed property
    expect(response.results[0].completed).toBe(false);

    // Assert that the rover's position did not change
    expect(rover.position).toBe(100); // Assuming initial position is 100

  })

  it('responds with the position for the move command', function() {
    // Create a new Rover object
    const rover = new Rover(100);
  
    // Create a new Message object with a MOVE command
    let name = "jkl";
    let distance = 50; // Distance to move
    let commands = [new Command('MOVE', distance)];
    let message = new Message(name, commands);
    // Call the receiveMessage method on the Rover object
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(message.commands.length);
  
    // Assert that the result has the correct completed property
    expect(response.results[0].completed).toBe(true);
  
    // Assert that the rover's position has been updated correctly
    expect(rover.position).toBe(distance); // Assuming initial position is 100
  });

});
