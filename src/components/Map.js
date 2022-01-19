import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import SetViewOnClick from './SetViewOnClick';

const Map = ({ position }) => {
	if (!position) {
		return <p>Type the city name or just use your location.</p>;
	}

	return (
		<MapContainer
			center={position}
			zoom={7}
			minZoom={4}
			position={position}
			scrollWheelZoom={true}
			style={{ height: 300, width: '100%' }}
		>
			<TileLayer
				attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
				url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=oVZpZ5F6MQOAWK3IkaZQ"
			/>
			<Marker position={position} />
			<SetViewOnClick coords={position} />
		</MapContainer>
	);
};

export default Map;
