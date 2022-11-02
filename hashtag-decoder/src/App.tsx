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
	hashtag: "",
	tweets_count: 0,
	users_list: [],
	users_count: 0,
	hashtags: [],
	hashtags_count: 0,
	hashtag_links: [],
	mentions: 0,
	locations:[],
	locations_count:0,
	raw:[],
	devices: {
		ios:0,
		android:0,
		web:0,
	},
	sentiment_count:{
		positive:0,
		neutral:0,
		negative:0
	},
	sentiment_average:{
		positive:0.0,
		neutral:0.0,
		negative:0.0
	},
	sentiment_timeline:[],
	verified_count:0
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
		const res = await fetch('http://127.0.0.1:5000/status');
		const data = await res.json() as typeof data_test;
		console.log(data)

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
							<Route path="/stream" element={<StreamRunner data={response} network={{nodes:response.hashtags?.map(e=>{return {id:e}}), links:response.hashtag_links}}/>}/>
						</Routes>
					</BrowserRouter>
					
				</div>
			</div>
		</div>
	);
}

export default App;
