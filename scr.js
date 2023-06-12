document.addEventListener("keydown", event => {
    if (event.keyCode === 13) {
        start();
    }
});

document.getElementById("button").addEventListener("click", start);

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}


async function getData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=98d20e075bd2816366af4312ebe4d1e9&units=metric`);
        const data = await response.json();
        const temp = data.main.temp;

        document.getElementById("temperature").textContent = temp + "°C";
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("city-name").textContent = data.name + " " + getFlagEmoji(data.sys.country);

        const color = temp < 20 ? "#3a78c2" : "#ff8100";
        document.getElementById("header").style.backgroundColor = color;
        document.getElementById("button").style.backgroundColor = color;
        document.getElementById("main").style.boxShadow = `0 2px 4px ${color}`;


         let picture= document.getElementById("image");
        switch (document.getElementById("description").textContent = data.weather[0].main) {
            case 'Thunderstorm':
                picture.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png');
                break;
            case 'Drizzle':
                picture.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');
                break;
            case 'Rain':
                picture.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');
                break;
            case 'Snow':
                picture.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');
                break;
            case 'Mist':
                picture.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png');
                break;
            case 'Clouds':
                picture.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/252/252035.png');
                break;
            case 'Clear':
                picture.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2698/2698240.png');
                break;
        }




    } catch (error) {
        alert("city not found");
    }
}

async function getTime(city) {
    const regions = ["Europe", "Asia", "America", "Africa", "Antarctica", "Atlantic", "Australia", "Pacific"];
    const formattedCity = city.replace(/ /g, "_");

    for (const region of regions) {
        try {
            const response = await fetch(`http://worldtimeapi.org/api/timezone/${region}/${formattedCity}`);
            const data = await response.json();
            document.getElementById("local-time").textContent = convertToTime(data.datetime);
            break;
        } catch (error) {
            document.getElementById("local-time").textContent = "No Time Data";
        }
    }
}

function convertToTime(dateString) {
    const [datePart, timePart] = dateString.split("T");
    const [hour, minute] = timePart.split(":");
    return `${hour}:${minute}`;
}

function start() {
    const city = document.getElementById("city").value;
    getData(city);
    getTime(city);
}
