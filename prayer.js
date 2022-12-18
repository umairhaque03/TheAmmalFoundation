console.log("Script running");




var requestOptions = {
  method: 'GET',
};


const locationButton = document.querySelector("#location");

const fajrTime = document.querySelector("#fajr");
const sunriseTime = document.querySelector("#sunrise");
const dhuhrTime = document.querySelector("#dhuhr");
const asrTime = document.querySelector("#asr");
const maghribTime = document.querySelector("#maghrib");
const ishaTime = document.querySelector("#isha");

console.log(locationButton);

locationButton.addEventListener("click", (e) => {
  console.log("Location button clicked");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPrayerTimes);
  } else { 
    locationButton.innerHTML = "Geolocation is not supported by this browser.";
  }
});

const d = new Date();
const dateYMD = d.toISOString();
const day = dateYMD.substring(8, 10);
const month = dateYMD.substring(5, 7);
const year = dateYMD.substring(0, 4);


dateDMY = `${day}-${month}-${year}`;
console.log(dateDMY);


async function getPrayerTimes(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  const myQuery = `https://api.aladhan.com/v1/timings/${dateDMY}?latitude=${lat}&longitude=${lon}&method=2`;
  console.log("My query:" + myQuery);
  var response = await fetch(myQuery);
  console.log(response);
  const myJson = await response.json();
  console.log(myJson);
  
  //TO DO: Make a shorter function using parameters
  
  const fajr = myJson.data.timings.Fajr;
  fajrTime.innerHTML = fajr;
  const sunrise = myJson.data.timings.Sunrise;
  sunriseTime.innerHTML = sunrise;
  const dhuhr = myJson.data.timings.Dhuhr;
  dhuhrTime.innerHTML = dhuhr;
  const asr = myJson.data.timings.Asr;
  asrTime.innerHTML = asr;
  const maghrib = myJson.data.timings.Maghrib;
  maghribTime.innerHTML = maghrib;
  const isha = myJson.data.timings.Isha;
  ishaTime.innerHTML = isha;
}

