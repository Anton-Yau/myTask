let tasks = [];
window.addEventListener('load', ()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10)dd = '0' + dd;
    if (mm < 10)mm = '0' + mm;
    today = mm + '/' + dd + '/' + yyyy;
    document.getElementById('mydate').innerHTML = "Today's date is: " + today;
})


window.addEventListener('load', ()=>{
  let long;
  let lat;
  let tempDes = document.getElementById("temperatureDescribe");
  let tempDeg = document.getElementById("temperatureDegree");

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
      long = position.coords.longitude;
      lat = position.coords.latitude;
      let proxy = `https://cors-anywhere.herokuapp.com/`;
      let weatherSource = `${proxy}https://api.darksky.net/forecast/15c69dfab84e25127f63d10943ec1926/${lat},${long}`;
      fetch(weatherSource)
      .then(response =>{
        return response.json();
      })
      .then(data =>{
        const {temperature, summary, icon} = data.currently;
        tempDeg.textContent = "Weather: " + Math.round((temperature-32) * 5/9) + " °C";
        tempDes.textContent = summary;
        //setIcon
        setIcons(icon, document.getElementById('icon1'));
      });
    });
  }
});

document.getElementById("add").onclick = function() {
    let nHTML = '';
    let userInput = document.getElementById('input_task').value;
    tasks.push(userInput);
    tasks.forEach(function(item) {
      nHTML += '<li>' + item + '</li>' + `<button type="button">Delete</button>`;
    });
    document.getElementById("item-list").innerHTML = '<ul>' + nHTML + '</ul>'
  }


  function setIcons(icon, iconID){
    const skycons = new Skycons({color:"black"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }