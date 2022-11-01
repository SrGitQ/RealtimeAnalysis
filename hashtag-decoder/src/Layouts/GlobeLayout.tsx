import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import GeneralInformation from '../Components/GeneralInformation';
import socketIOClient from 'socket.io-client';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	elements: {
		point:{
			radius: [0,0,0,0,4]
		},
		line: {
			tension: 0.4,
		}
	},
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
    },
	plugins: {
		title: {
			display: false,
		},
		legend: {
			display: true,
			labels: {
				boxWidth: 2,
				color: '#7F7F7F',
				font: {
					size: 8,
				},
			},
			position: 'bottom' as const,
			align: 'center' as const,
		}
	},
};


type Props = {
	changeLayout: (layout: string) => void;
	data: any;
};

const GlobeLayout: React.FC<Props> = ({ changeLayout, data }) => {
	const navigate = useNavigate();

	const ENDPOINT = 'http://localhost:5000'
	
	const closeSocket = () => {
		const socket = socketIOClient(ENDPOINT);
		socket.disconnect();
	}

	let timeline = data?.sentiment_timeline

	if(timeline?.length > 5){
		timeline = timeline.slice(0,5)
	}
	const dataA = {
		labels:timeline?.map((item:any) => item),
		datasets: [
			{	
				label: `${Math.round(data?.sentiment_avg?.positive*100)}% Happy`,
				data: timeline?.map((item:any) => item?.positive),
				borderColor: '#4690FF',
				fill: false,
				backgroundColor: [
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(70, 144, 255, 1)',
				],
			},
			{
				label: `${Math.round(data?.sentiment_avg?.negative*100)}% Bad`,
				data: timeline?.map((item:any) => item?.negative),
				borderColor: '#F64BBC',
				fill: false,
				backgroundColor: [
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(246, 75, 188, 1)',
				],
			},
			{
				label: `${Math.round(data?.sentiment_avg?.neutral*100)}% Neutral`,
				data: timeline?.map((item:any) => item?.neutral),
				borderColor: '#3E03A1',
				fill: false,
				backgroundColor: [
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(0, 0, 0, 0.0)',
				  'rgba(62, 3, 161, 1)',
				],
			},
		],
	};


	return (
		<div className="h-full flex flex-col">
			<div 
				className="h-[1.5rem] text-[#172158] text-center text-xl font-[1200]"
				onClick={() => changeLayout('graph')}
			>
				<FontAwesomeIcon icon={solid('chevron-up')} />
			</div>
			<div className="h-1/6">
				<h1 className="text-white text-4xl font-bold"
					onClick={() => {
							navigate('/')
							closeSocket()
						}
					}
				>
					{data?.hashtag?.includes('#') ? data?.hashtag : `#${data?.hashtag}`}
				</h1>
			</div>
			<GeneralInformation data={data}/>
			<div className="h-[6rem] pr-48 pl-24">
				<Line options={options} data={dataA}/>
			</div>
		</div>
	);
};

export default GlobeLayout;
