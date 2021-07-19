"use strict";
console.log("starting script");
function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
  //return a failed at the label message if the testing body function returns false,
  // we run a function and see if its return value is what we expected to see
}

test("convert Latin text to uppercase", () => {
  return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
  return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
  return "􀟣􀡑􀢩􀰡􀰒".toUpperCase() == "􀟣􀡑􀢩􀰡􀰒";
});

// its better to use a test runner for this

//function to convert a whole number to a string in a given base

function numberToString(n, base = 10) {
  let result = "",
    sign = "";
  if (n < 0) {
    sign = "-";
    n = -n; //make it positive for starters
  }
  do {
    result = String(n % base) + result;

    n = Math.floor(n / base);
  } while (n > 0);

  return sign + result;
}
console.log(numberToString(13, 10));

//dealing with faulty input
function promptNumber(question) {
  let result = Number(prompt(question));
  if (Number.isNaN(result)) return null;
  else return result;
}

console.log(promptNumber("How many trees do you see?"));

function lastElement(array) {
  if (array.length == 0) {
    return { failed: true };
  } else {
    return { element: array[array.length - 1] };
  }
}

//errors and exceptions

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  //anything else should throw an exception
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

//if this code might return an error, we run it with the try and catch set of commands
try {
  console.log("You see", look());
} catch (error) {
  //incase an error is thrown it will come in the error binding as a value
  console.log("Something went wrong: " + error);
}

//bad banking code
const accounts = {
  a: 100,
  b: 0,
  c: 20,
};

function getAccount() {
  let accountName = prompt("Enter an accout name");
  if (!accounts.hasOwnProperty(accoutName)) {
    throw new Error(`No such accout: ${accoutName}`);
  }
  return accountName;
}

/*function transfer(from, amount) {
  if (acounts[from] < amount) return;
  accounts[from] -= amount;
  accouts[getAccount()] += amount; //what if you dont have this accout where does it money go lmao
}
*/

function transfer(from, amount) {
  if (accounts[from] < amount) return; // we can't transfer what we dont have
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    acounts[getAccount()] += amount; //if it throws an error her it will jump to the 'catch and the finally blocks'
    progress = 2;
  } finally {
    if (progress == 1) {
      // we didn't get to two because we throw an error and came to the finally block
      acounts[from] += amount; //put the money back
    }
  }
}

// catching the wrong exception
// for (;;) {
//   try {
//     let dir = promptDirection("Where?"); // <- typo
//     console.log("You chose ", dir);
//     break;
//   } catch (e) {
//     console.log("Not a valid direction. Try again. "); //dont hide the error information otherwise you may be dealing with another error that is not the one you had expected
//   }
// }

// checking it is the error we expect

class InputError extends Error {
  //empty, just the same as the error class
  // but errors that dont correspond to the standard error correspond to this class
}

function promptDirection(question) {
  // will be called in  try block because it may throw an error as it is interacting with the outside world--- a human being
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction " + result);
}

for (;;) {
  try {
    let dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    if (e instanceof InputError) {
      console.log("Not a valid direction. Try again. ");
    } else {
      throw e;
    }
  }
}

//assertions: checks in the program to verify if sth is the way it should be

function firstElement(array) {
  if (array.length == 0) {
    throw new Error("firstElement called with []");
    // we throw an error object with this message
  }
  return array[0];
}
