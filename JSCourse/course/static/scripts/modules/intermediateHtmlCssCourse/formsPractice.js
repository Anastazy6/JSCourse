const FormsPractice = (function() {
  const passwordField = document.getElementById('password');
  const confirmField  = document.getElementById('confirm' );

  const passFields = [passwordField, confirmField];

  const regexTests = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    numbers  : /\d/,
    specChars: /[\W_]/
  }

  function validatePassword() {
    let password = passwordField.value;
    let confirm  = confirmField .value;


    passFields.forEach(
      field => {
        // Both start as valid, then are rendered invalid if they don't pass the tests
        field.setCustomValidity("");
      }
    );
    
    if (_isNotComplexEnough(password)) {
      passwordField.setCustomValidity(
        "Password must contain at least one character from any 3 of "+
        "the 4 following character groups:\n  lower-case letters;\n  upper-case "+
        "letters;\n  special characters;\n  digits;"
      )
    }

    if (password.length < 6) {
      passwordField.setCustomValidity("Password must be at least 6 characters long");
    }

    if (password !== confirm) {
      confirmField.setCustomValidity("Passwords don't match");
    }
  }


  function _isNotComplexEnough(password) {
    let complexity = 0;

    Object.values(regexTests).forEach(testCase=> {
      if (testCase.test(password)) complexity++;
    })
    console.log(`Complexity: ${complexity}`);

    return complexity < 3 ? true : false;
  }



  function run() {
    console.log("Forms practice module loaded!");
    
    passFields.forEach(field => {
      field.addEventListener("input", validatePassword);
    })
  }

  return {
    run: run
  }
})()

const App = () => {
  FormsPractice.run();
}

export default App;