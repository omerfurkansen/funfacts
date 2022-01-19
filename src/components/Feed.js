import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePosition } from 'use-position';
import Weather from './Weather';
import Map from './Map';
import { ImSearch } from 'react-icons/im';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Feed = () => {
	const [catImage, setCatImage] = useState({});
	const [dogImage, setDogImage] = useState({});
	const [catFacts, setCatFacts] = useState([]);
	const [factIndex, setFactIndex] = useState(0);
	const [spaceFacts, setSpaceFacts] = useState([]);
	const [spaceFactIndex, setSpaceFactIndex] = useState(0);
	const [uselessFacts, setUselessFacts] = useState([]);

	const { latitude, longitude } = usePosition();

	const [weather, setWeather] = useState();
	const [unit, setUnit] = useState(true);
	const [cityName, setCityName] = useState('');

	const lang = navigator.language.split('-')[0];

	const getWeatherDataFromCoordinates = async (lat, lon) => {
		try {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=${lang}`
			);
			setWeather(data);
		} catch {
			alert('Allow location access.');
		}
	};

	const getWeatherDataFromCity = async (city) => {
		try {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=${lang}`
			);
			setWeather(data);
		} catch {
			alert("City couldn't be found.");
		}
	};

	const toggleNextFact = (index, setIndex, factType) => {
		index !== factType.length - 1 ? setIndex(index + 1) : setIndex(0);
	};

	const togglePreviousFact = (index, setIndex, factType) => {
		index !== 0 ? setIndex(index - 1) : setIndex(factType.length - 1);
	};

	useEffect(async () => {
		await getWeatherDataFromCity('London');

		await axios
			.get('https://catfact.ninja/facts?limit=3&max_length=140')
			.then((response) => setCatFacts(response.data.data.map((a) => a.fact)))
			.catch((err) => console.log(err));

		await axios
			.all([
				axios.get('https://aws.random.cat/meow'),
				axios.get('https://aws.random.cat/meow'),
			])
			.then(
				axios.spread((res1, res2) =>
					setCatImage({ first: res1.data.file, second: res2.data.file })
				)
			)
			.catch((err) => console.log(err));

		await axios
			.all([
				axios.get('https://random.dog/woof.json'),
				axios.get('https://random.dog/woof.json'),
			])
			.then(
				axios.spread((res1, res2) =>
					setDogImage({ first: res1.data.url, second: res2.data.url })
				)
			)
			.catch((err) => console.log(err));

		await axios
			.get(
				`https://api.nasa.gov/planetary/apod?count=5&api_key=${process.env.REACT_APP_NASA_API_KEY}`
			)
			.then((response) =>
				setSpaceFacts(
					response.data.map((a) => ({
						date: a.date,
						explanation: a.explanation,
						title: a.title,
						url: a.url,
					}))
				)
			)
			.catch((err) => console.log(err));

		await axios
			.all([
				axios.get('https://uselessfacts.jsph.pl/random.json?language=en'),
				axios.get('https://uselessfacts.jsph.pl/random.json?language=en'),
				axios.get('https://uselessfacts.jsph.pl/random.json?language=en'),
				axios.get('https://uselessfacts.jsph.pl/random.json?language=en'),
			])
			.then(
				axios.spread((res1, res2, res3, res4) =>
					setUselessFacts({
						trivia: res1.data.text,
						year: res2.data.text,
						date: res3.data.text,
						math: res4.data.text,
					})
				)
			)
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="feed">
			<div className="title">WEATHER & MAP</div>
			<div className="weatherAndMap">
				<div id="weather">
					<div className="searchBox">
						<input
							placeholder="City name..."
							value={cityName}
							onChange={(e) => setCityName(e.target.value)}
						/>
						<ImSearch
							className="search"
							onClick={() => {
								getWeatherDataFromCity(cityName);
								setCityName('');
							}}
						/>
					</div>
					<button
						className="coordBox"
						onClick={() => {
							getWeatherDataFromCoordinates(latitude, longitude);
						}}
					>
						Use my coordinates
					</button>
					<Weather weather={weather} unit={unit} setUnit={setUnit} />
				</div>
				{weather && (
					<div id="map" style={{ height: 300, width: '100%' }}>
						<Map position={[weather.coord.lat, weather.coord.lon]} />
					</div>
				)}
			</div>
			<div className="title">DOGS & CATS</div>
			{catFacts.length !== 0 && (
				<div className="dogAndCats">
					{dogImage.first && dogImage.first.slice(-3) === 'mp4' ? (
						<video
							className="dogImage secondImage"
							src={dogImage.first}
							controls
							autoPlay={'autoplay'}
							loop
						/>
					) : (
						<img
							className="dogImage secondImage"
							src={dogImage.first}
							alt="dog"
						/>
					)}
					{dogImage.first && dogImage.second.slice(-3) === 'mp4' ? (
						<video
							className="dogImage"
							src={dogImage.second}
							controls
							autoPlay={'autoplay'}
							loop
						/>
					) : (
						<img className="dogImage" src={dogImage.second} alt="dog" />
					)}
					<div className="textPart">
						<button
							onClick={() =>
								togglePreviousFact(factIndex, setFactIndex, catFacts)
							}
						>
							<FaAngleLeft />
						</button>
						<div className="textBox">
							<h4>Fact {factIndex + 1}</h4>
							<p>{catFacts[factIndex]}</p>
						</div>
						<button
							onClick={() => toggleNextFact(factIndex, setFactIndex, catFacts)}
						>
							<FaAngleRight />
						</button>
					</div>
					<img className="catImage" src={catImage.first} alt="cat" />
					<img
						className="catImage secondImage"
						src={catImage.second}
						alt="cat"
					/>
				</div>
			)}
			<div className="title">SPACE</div>
			{spaceFacts.length !== 0 && (
				<div className="spaceFacts">
					{spaceFacts[spaceFactIndex].url.slice(-3) === 'jpg' || 'gif' ? (
						<img
							className="spaceFactImage"
							alt="space"
							src={spaceFacts[spaceFactIndex].url}
						/>
					) : (
						<video
							className="spaceFactImage"
							src={spaceFacts[spaceFactIndex].url}
							controls
							autoPlay={'autoplay'}
							loop
						/>
					)}
					<div className="spaceFactRightPart">
						<p className="spaceFactDate">
							{new Date(spaceFacts[spaceFactIndex].date).toLocaleDateString(
								'en-US',
								{
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								}
							)}
						</p>
						<h4 className="spaceFactTitle">
							{spaceFacts[spaceFactIndex].title}
						</h4>
						<p className="spaceFactInformation">
							{spaceFacts[spaceFactIndex].explanation}
						</p>
						<div className="selectionButtons">
							<button
								onClick={() =>
									togglePreviousFact(
										spaceFactIndex,
										setSpaceFactIndex,
										spaceFacts
									)
								}
							>
								<FaAngleLeft />
							</button>
							<button
								onClick={() =>
									toggleNextFact(spaceFactIndex, setSpaceFactIndex, spaceFacts)
								}
							>
								<FaAngleRight />
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="title">USELESS FACTS</div>
			{Object.keys(uselessFacts).length === 4 && (
				/*all these names are generated by me to declare different objects
					they don't have any sense at all*/
				<div className="numbers">
					<p className="trivia">• {uselessFacts.trivia}</p>
					<p className="year">• {uselessFacts.year}</p>
					<p className="date">• {uselessFacts.date}</p>
					<p className="math">• {uselessFacts.math}</p>
				</div>
			)}
		</div>
	);
};

export default Feed;
