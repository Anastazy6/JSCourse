const FormsPractice = (function() {
  const passwordField = document.getElementById('password');
  const confirmField  = document.getElementById('confirm' );

  const passFields = [passwordField, confirmField];

  function validatePassword() {
    let password = passwordField.value;
    let confirm  = confirmField .value;

    console.log(password, confirm);

    passFields.forEach(
      field => {
        field.setCustomValidity(""); // Valid by default;

        if (field.value.length < 6) {
          field.setCustomValidity("Passwords must be at least 6 characters long");
        }
      }
    );
    
    if (password !== confirm) {
      passFields.forEach(
        field => field.setCustomValidity("Passwords don't match")
      );
    }

    
  }

  passFields.forEach(field => {
    field.addEventListener("input", validatePassword);
  })


  function run() {
    console.log("Forms practice module loaded!");
  }

  return {
    run: run
  }
})()

const App = () => {
  FormsPractice.run();
}

export default App;