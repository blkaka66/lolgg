interface CheckEmailReturn {
  valid: boolean;
  message: string;
}
function checkEmail(value: string, invalidMessage: string = 'Invalid email address!'): CheckEmailReturn {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (value.match(validRegex)) {
    // alert("Valid email address!");
    return { valid: true, message: 'OK'};
  } else {
    // alert("Invalid email address!");
    return { valid: false, message: invalidMessage }
  }
}



export {
  checkEmail
}
