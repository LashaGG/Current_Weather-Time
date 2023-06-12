ALLdata = {}


function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function getdata(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q= ${city} &appid=98d20e075bd2816366af4312ebe4d1e9&units=metric`)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;

            let color = "#ff8100";
            if (temp < 20) color = "#3a78c2";

            document.getElementById("header").style.backgroundColor = color;
            document.getElementById("button").style.backgroundColor = color;


            document.getElementById("temperature").textContent = temp + "°C";
            document.getElementById("description").textContent = data.weather[0].description;
            document.getElementById("city-name").textContent = data.name + " " + getFlagEmoji(data.sys.country);

        })
        .catch(error => {
            alert("city not found");
        });

}


document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        start();
    }
});

document.getElementById("button").addEventListener("click", function () {
    start();
});


function start() {
    const city = document.getElementById("city").value;
    getdata(city);
}
