class Weather {
	constructor(city) {
		this.apiKey = 'a6f6271d43584388b16103159212811';
		this.city = city;
	}

	//Fetch weather from api
	async getWeather() {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city} `
		);
		const responseData = await response.json();

		return responseData;
	}

	//change weather location
	changeLocation(city) {
		this.city = city;
	}
}
