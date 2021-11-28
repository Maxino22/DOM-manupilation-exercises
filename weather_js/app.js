//init storage
const storage = new Storage();
// Get Storage location data
const weatherLocation = storage.getLocationData();
//init weather object
const weather = new Weather(weatherLocation.city);

//init ui
const ui = new UI();

//Get weather on Dom load
document.addEventListener('DOMContentLoaded', getWeather);

//change loctaion event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
	const city = document.getElementById('city').value;

	//change location
	weather.changeLocation(city);

	//set Location in LocalStorage
	storage.setLocationData(city);

	// Get Weather and display
	getWeather();

	//close modal
	$('#locModal').modal('hide');
});

function getWeather() {
	weather
		.getWeather()
		.then((results) => {
			ui.paint(results);
		})
		.catch((err) => console.log(err));
}
