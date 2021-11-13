function submitForm(event) {
  const button = event.target;
  const form = button.form;
  
  const request = new XMLHttpRequest();
  request.open("POST", "/login");
  request.setRequestHeader('Authorization', `Basic ${btoa('username:secret')}`);
  request.send();
}
