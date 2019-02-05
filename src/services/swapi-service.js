const header = new Headers();

export default class SwapiService {

    params = {
        method: 'GET',
        headers: header,
        mode: 'cors',
        // 'Access-Control-Allow-Origin': "*",
        cache: 'default'
    };

    _apiBase = 'https://swapi.co/api';

    getResource = async (url) => {
        const request = new Request(`${this._apiBase}${url}`, this.params);
        const res = await fetch(request);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    };

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    };

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    };

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet);
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    };

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship);
    };

    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    };

    _extractId = (item) => {
        const idRegExp = /\/([0-9])*\/$/;
        return item.url.match(idRegExp)[1];

    };

    _transformPlanet = (planet) => {

        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    };

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            constInCredits: starship.constInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    };

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }


}

// const swapi = new SwapiService();

// swapi.getAllnews().then((author) => {
//     author.forEach((a) => {
//         console.log(a.source.name)
//     })
// });
//
// swapi.getCountry('ru').then((res) => {
//     res.forEach((c) => {
//         console.log(c.source.name)
//     })
// });

// swapi.getTopHeadlines();
