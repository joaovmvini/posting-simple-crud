export class Validator {
  validateInputEffect(ref, condition) {
    if (condition) {
      ref.style.border = "";
      return;
    }
    ref.style.border = "2px solid red";
    return;
  }
  emailValidator(e) {
    const currentValue = e.target.value;
    const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const condition = format.test(String(currentValue).toLowerCase());
    this.validateInputEffect(e.target, condition);
  }
  nameValidator(e) {
    const currentValue = e.target.value;
    const limitCharacters = { min: 6, max: 30 };
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const condition =
      !format.test(currentValue) &&
      currentValue.length >= limitCharacters.min &&
      currentValue.length <= limitCharacters.max;
    this.validateInputEffect(e.target, condition);
  }
  ageValidator(e) {
    const currentValue = e.target.value * 1;
    const limitAge = { min: 8, max: 110 };
    var format = new RegExp("^[0-9]+$");
    const condition =
      format.test(currentValue) &&
      currentValue >= limitAge.min &&
      currentValue < limitAge.max;

    this.validateInputEffect(e.target, condition);
  }
  passwordValidator(e) {
    const currentValue = e.target.value;
    this.validateInputEffect(e.target, currentValue.length >= 6);
  }
  getListener(inputType, event) {
    switch (inputType) {
      case "email":
        return this.emailValidator(event);
      case "username":
        return this.nameValidator(event);
      case "age":
        return this.ageValidator(event);
      case "password":
        return this.passwordValidator(event);
      default:
        return null;
    }
  }
  validate(...refs) {
    refs.forEach((ref) => {
      document.getElementById(ref).addEventListener("change", (event) => {
        this.getListener(ref, event);
      });
    });
  }
}
