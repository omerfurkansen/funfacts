import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

const Weather = ({ weather, unit, setUnit }) => {
	const convertUnit = (data) => {
		return data * 1.8 + 32;
	};

	if (!weather) {
		return <p>Type the city name or just use your location.</p>;
	}

	return (
		<div className="weatherBox">
			<h2 style={{ color: 'pink' }}>
				{weather.name}, {weather.sys.country}
			</h2>
			<div className="imageAndInfo">
				<img
					src={`http://openweathermap.org/img/wn/${weather.weather.map(
						(data) => data.icon
					)}@2x.png`}
					alt={weather.weather.main}
					style={{ height: 60, width: 60 }}
				/>
				<div className="infoOfWeather">
					<h3>
						{weather.weather.map(
							(data) =>
								data.description.charAt(0).toUpperCase() +
								data.description.slice(1)
						)}
					</h3>
					<h1>
						{unit
							? weather.main.temp.toFixed()
							: convertUnit(weather.main.temp).toFixed()}
						°{unit ? 'C' : 'F'}
					</h1>
					{unit ? (
						<BsToggleOff
							onClick={() => setUnit(!unit)}
							style={{ height: 25, width: 25 }}
						/>
					) : (
						<BsToggleOn
							onClick={() => setUnit(!unit)}
							style={{ height: 25, width: 25 }}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Weather;
