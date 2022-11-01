import React, { useState, useEffect } from "react";// , { useState, useEffect }
import GlobeLayout from "./Layouts/GlobeLayout";
import SearchLayout from "./Layouts/SearchLayout";
import GraphLayout from "./Layouts/GraphLayout";
import {
	Route,
  	Routes,
	BrowserRouter,
} from "react-router-dom";

const data_test = {
	hashtag: "hashtag",
	tweets: 140,
	users: 140,
	mentions: 13,
	places: 13,
	verified: 13,
	sentiment: {
		positive: 0.60,
		neutral: 0.20,
		negative: 0.20,
	},
	devices: {
		android: 33,
		ios: 33,
		web: 33,
	},
	no_users: 140,
	sentiment_timeline: [
		{ positive: 0.33, neutral: 0.53, negative: 0.33 },
	],
	hash_network:{
			nodes: [
				{ id: '#Harry' },
			],
			links: [
				
			]
	},
	hashtags: 140,
	places_locations:[
		{ lat: 21.009293505988, lng: -89.69595640433737},
	]
}

type Props = {
	data: any,
	network: any,
}

const StreamRunner: React.FC<Props> = ({data, network}) => {
	const [mode, setMode] = useState("globe");

	return (
		<div>
			{mode === "globe" ? <GlobeLayout changeLayout={setMode} data={data}/> : null}
			{mode === "graph" ? <GraphLayout changeLayout={setMode} data={data} network = {network}/> : null}
		</div>
	);
};

const App: React.FC = () => {
	const interval = 4000;
	const [response, setResponse] = useState(data_test);

	const getData = async () => {
		const res = await fetch('http://127.0.0.1:5000/streamdata');
		const data = await res.json() as typeof data_test;

		setResponse(data);
	}

	useEffect(() => {
		getData();
	}, []);
	setTimeout(() => {getData()}, interval);
	
	return (
		<div className="h-[100vh] bg-cover bg-[url('/layers/background.png')]">
			<div className="absolute z-10 w-[100vw] h-[100vh] p-8">
				<div className="h-full">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<SearchLayout/>} />
							<Route path="/stream" element={<StreamRunner data={response} network={response.hash_network}/>}/>
						</Routes>
					</BrowserRouter>
					
				</div>
			</div>
		</div>
	);
}

export default App;
