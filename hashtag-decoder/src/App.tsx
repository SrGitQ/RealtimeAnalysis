import React, { useState, useEffect } from "react";// , { useState, useEffect }
import GlobeLayout from "./Layouts/GlobeLayout";
import SearchLayout from "./Layouts/SearchLayout";
import GraphLayout from "./Layouts/GraphLayout";
import {
	Route,
  	Routes,
	BrowserRouter,
} from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const data_test_1 = {
	hashtag: "Pop",
	tweets_count: 0,
	users_list: [],
	users_count: 0,
	hashtags: [],
	hashtags_count: 0,
	hashtag_links: [],
	mentions: 0,
	locations:[{lat:41.68224, lon:79.08970}],
	locations_count:1,
	raw:[],
	devices: {
		ios:0,
		android:0,
		web:0,
	},
	sentiment_count_rov:{
		positive:0,
		neutral:0,
		negative:0
	},
	sentiment_average_rov:{
		positive:0.0,
		neutral:0.0,
		negative:0.0
	},
	sentiment_timeline_rov:[
		{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},
	],
	sentiment_general_timeline: {
		'2020-01-01 12:20': {
			positive: 20,
			neutral: 20,
			negative: 20
		},
		'2020-01-01 12:30': {
			positive: 20,
			neutral: 30,
			negative: 40
		},
	},
	sentiment_count_our:{
		positive:0,
		neutral:0,
		negative:0
	},
	sentiment_average_our:{
		positive:0.0,
		neutral:0.0,
		negative:0.0
	},
	sentiment_timeline_our:[
		{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},
	],
	verified_count:0
}

const data_test_2 = {
	hashtag: "Pop",
	tweets_count: 0,
	users_list: [],
	users_count: 0,
	hashtags: [],
	hashtags_count: 0,
	hashtag_links: [],
	mentions: 0,
	locations:[{lat:44.84654, lon:-139.63633}],
	locations_count:1,
	raw:[],
	devices: {
		ios:0,
		android:0,
		web:0,
	},
	sentiment_count_rov:{
		positive:0,
		neutral:0,
		negative:0
	},
	sentiment_average_rov:{
		positive:0.0,
		neutral:0.0,
		negative:0.0
	},
	sentiment_timeline_rov:[
		{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},
	],
	sentiment_general_timeline: {
		'2020-01-01 12:20': {
			positive: 20,
			neutral: 20,
			negative: 20
		},
		'2020-01-01 12:30': {
			positive: 20,
			neutral: 30,
			negative: 40
		},
	},
	sentiment_count_our:{
		positive:0,
		neutral:0,
		negative:0
	},
	sentiment_average_our:{
		positive:0.0,
		neutral:0.0,
		negative:0.0
	},
	sentiment_timeline_our:[
		{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},{
			"negative": 0.04433497536945813,
			"neutral": 0.6748768472906403,
			"positive": 0.28078817733990147
		},
	],
	verified_count:0
}
const comp_data = {
	one:data_test_1,
	two:data_test_2
}

type Props = {
	data: any,
}

const StreamRunner: React.FC<Props> = ({data}) => {
	const [mode, setMode] = useState("globe");

	return (
		<div>
			{mode === "globe" ? <GlobeLayout changeLayout={setMode} data={data}/> : null}
			{mode === "graph" ? <GraphLayout changeLayout={setMode} data={data}/> : null}
		</div>
	);
};

const SimpleCard: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="bg-[#0c1435] w-1/4 h-[250px] rounded-xl"
			onClick={() => navigate('/stream')}
		>
			<div className="bg-[#190a2f] h-[140px] rounded-t-xl"></div>
			<div>
			<h1 className="text-white text-xl font-bold p-3">
				HOTF vs ROP
			</h1>
			</div>
		</div>
	)
}

const CardSelector: React.FC = () => {
	return (
		<div>

			<h1 className="text-white text-4xl font-bold text-center">
				Choose a comparision
			</h1>
			<br/>
			<br/>
			<SimpleCard/>
		</div>
	)
}

const App: React.FC = () => {
	const interval = 4000;
	const [response, setResponse] = useState(comp_data);

	// const getData = async () => {
	// 	const res = await fetch('http://127.0.0.1:5000/status');
	// 	const data = await res.json() as typeof data_test;
	// 	console.log(data)

	// 	setResponse(data);
	// }

	// useEffect(() => {
	// 	getData();
	// }, []);
	// setTimeout(() => {getData()}, interval);
	
	return (
		<div className="h-[100vh] bg-cover bg-[url('/layers/background.png')]">
			<div className="absolute z-10 w-[100vw] h-[100vh] p-8">
				<div className="h-full">
					
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<CardSelector/>} />
							<Route path="/stream" element={<StreamRunner data={response}/>}/>
						</Routes>
					</BrowserRouter>
					
				</div>
			</div>
		</div>
	);
}

export default App;
