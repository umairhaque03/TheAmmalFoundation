console.log("Script running");

var requestOptions = {
  method: 'GET',
};

// Captures submit button and the text
const submitButton = document.querySelector("#submit");
const header = document.querySelector("#change");

// Log the elements to confirm that the querySelectors worked.
/*
console.log(submitButton);
console.log(header);
*/

submitButton.addEventListener("click", (e) => {
  console.log("Submit button clicked");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    //console.log("true");
  } else { 
    locationButton.innerHTML = "Geolocation is not supported by this browser.";

  }
});


async function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  const myQuery = `https://masjidnear.me/api/Masjid/SearchMasjids/query/lat$${lat},lng$${lon},rad$25000/`;
  console.log("My query:" + myQuery);
 
  // fetch(...).then(() => {...}).catch(() => {...});
  try {
    const response = await fetch(myQuery);
    console.log(response);
    //checks if the status is 204 meaning there are no moques in the area
    console.log("response.status: ", response.status);
    if (response.staus === 204)
    {
      console.log("error");
      header.innerHTML = "Sorry no mosques in your area!";
    }
    const responseJson = await response.json(); // read JSON response
    console.log(responseJson);
   
    // code to execute once JSON response is available
    let name = responseJson[0].masjidName;
    let address = responseJson[0].masjidAddress.street + " " + responseJson[0].masjidAddress.city + " " + responseJson[0].masjidAddress.state + " " + responseJson[0].masjidAddress.zipcode;
    header.innerHTML = "The nearest mosque is:" + "<br />" + name + "<br />" + "<br />" + " and is located at: " + "<br />" + address;
  } catch (error) {
    console.error(error);
    
  }
  
}