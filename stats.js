console.log("stats running");

const submitButton = document.querySelector("#hit");

console.log(submitButton);

submitButton.addEventListener ("click", (e) => {
  console.log("clicked");
  alert("Thank you for your information. We'll get back to you soon.");
});

