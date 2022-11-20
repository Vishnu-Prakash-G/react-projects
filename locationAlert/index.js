// @ts-nocheck TODO remove when fixed
let latitute, longitude;
let distanceObtained, alarmTime, currentTime;
ringtone = new Audio("./files/ringtone.mp3");
const distanceContainer = document.getElementById("distanceContainer");

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime === currentTime) {
    ringtone.play();
    ringtone.loop = true;
  }
});

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitute = position.coords.latitude;
        longitude = position.coords.longitude;
      },
      () => {}
    );
  }
};
const getDistance = () => {
  const service = new google.maps.DistanceMatrixService();

  // build request
  const origin1 = { lat: latitute, lng: longitude };
  const destinationA = document.getElementById("destination").value;

  const request = {
    origins: [origin1],
    destinations: [destinationA],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };

  // get distance matrix response
  service.getDistanceMatrix(request).then((response) => {
    let distance = response.rows[0].elements[0].distance.text;
    distance = distance.split(" ");
    distance = Number(distance[0]);
    distanceObtained = distance;
    console.log(distanceObtained);
    distanceContainer.innerText = `${distanceObtained} km`;
    if (distanceObtained < 100) {
      alarmTime = currentTime;
    } else {
      ringtone.pause();
    }
  });
};

const clickButton = document.getElementById("distanceButton");
const originButton = document.getElementById("originButton");

clickButton.addEventListener("click", getDistance);
originButton.addEventListener("click", getCurrentLocation);
// setInterval(getCurrentLocation, 2000);
// setInterval(getDistance, 2000);
