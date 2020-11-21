
/*
  In the comments below, "type" refers to the types of characters 
  in a potential password, i.e. lowercase, uppercase, numeric, or
  special character. 
*/

var timesClicked = 0;
var generateBtn = document.querySelector("#generate");
var form = document.getElementsByTagName("form")[0];
var passwordBtn = document.getElementById("password-length");
var passwordLength;
var typeArray = [];

// Used for contstructing random password. 
var lowerCase = 'abcdefghijklmnopqrstuvwxyz'.split("");
var upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
var numbers = '0123456789'.split("");
var specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split("");

var allChars = [lowerCase, upperCase, numbers, specialChars];

function generatePassword(typeArray, passwordLength) {
  var randType;
  var length = typeArray.length;
  var arrayLength;
  var passwordBuild = "";
  for (i = 0; i < passwordLength; i++) {
    // Types correspond to a random element in typeArray.
    // 0 corresponds to lowercase, etc.
    randType = typeArray[ Math.floor(Math.random() * length) ];
    arrayLength = allChars[randType].length;
    randChar = allChars[randType][ Math.floor(Math.random() * arrayLength) ];
    passwordBuild += randChar;
  }
  return passwordBuild;
}

// Write password to the #password input
function writePassword() {
  passwordLength = document.getElementById("password-length").value;
  passwordLength = Number(passwordLength);
  console.log(typeof(passwordLength));

  // Quick checks for valid input.
  if (!( Number.isInteger(passwordLength) )) {
    window.alert("Please enter an integer for password length.");
    location.reload()
  }
  if ((passwordLength < 8) || (passwordLength > 128)) {
    window.alert("Please choose a valid password length.");
    location.reload()
  }

  // Array of check/unchecked boxes (elements).
  var checkboxes = document.getElementsByClassName("form-check-input");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      // Each number in typeArray corresponds to a checkbox that was checked, 
      // with checkbox position given by its placement. 
      typeArray.push(i);
    }
  }
  if (typeArray.length === 0) {
    window.alert("Please choose at least 1 character type.");
    location.reload()
  }
  var password = generatePassword(typeArray, passwordLength);

  // Create reference to password html element.
  var passwordText = document.querySelector("#password");

  // Give that reference the return value of generatePassword().
  var form = document.getElementById("form");
  var passwordBox = document.getElementsByClassName("card-body")[0];

  // Display password, make appropriate style changs to header and button.
  form.style.display = "none";
  passwordText.value = password;
  passwordBox.style.display = "block";
  var headerText = document.getElementById("header");
  var buttonText = document.getElementById("generate");
  headerText.textContent = "Your generated password:";
  buttonText.textContent = "Generate New Password";

}

// Add event listener to generate button
generateBtn.addEventListener("click", function(event) {
  timesClicked++;
  if (timesClicked === 1) {
    writePassword();
  }
  else {
    location.reload();
  }
});
