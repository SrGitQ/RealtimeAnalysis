import Globe from 'react-globe.gl';
import React, { useRef, useEffect } from "react";

type Globe_t = {
	marks: any
}

const WorldR: React.FC <Globe_t> = ({ marks }) => {
    const globeEl = useRef();

    useEffect(() => {
		// Auto-rotate
		if (globeEl.current) {
			const r = globeEl.current as any;
			if (r.controls) {
				r.controls().autoRotate = true;
				r.controls().autoRotateSpeed = 2;
			}
		}
	  }, []);
	
	const loc_1 = marks?.one?.locations?.map((mark:any) => {
		return {
			lat: mark.lat,
			lng: mark.lon,
			color:'#219bf0'
		}
	})

	const loc_2 = marks?.two?.locations?.map((mark:any) => {
		return {
			lat: mark.lat,
			lng: mark.lon,
			color:'#f74bbc'
		}
	})

	const locations = [...loc_1, ...loc_2]

	return (
		<Globe
			ref={globeEl}
			width={1000}
			height={470}
			backgroundColor='rgba(0, 0, 0, 0)'
			globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
			animateIn={true}
			pointsData={locations}
			pointColor={(d:any) => {
				console.log(d)
				return d.color
			}}
		/>
	);
};

const GlobeRender: React.FC <Globe_t> = ({ marks }) => {
	
	return (
		<div className="flex justify-center">
			<WorldR marks={marks}/>
		</div>
	);
};

export default GlobeRender;
