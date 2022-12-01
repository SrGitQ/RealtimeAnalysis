import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import GeneralInformation from '../Components/GeneralInformation';
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


	const masterpiece = (timeline:any, sentiment:any) => {
		const renderEmpty = (items:any, color:any) => {
			let items_ = items.map((e:any) => 'rgba(0, 0, 0, 0.0)')
			items_?.pop()
			items_.push(color)
			return items_
		}
		return {
			labels:timeline?.map((item:any) => item),
			datasets: [
				{	
					label: `${Math.round(sentiment?.positive*100)}% Happy`,
					data: timeline?.map((item:any) => item?.positive),
					borderColor: '#4690FF',
					fill: false,
					backgroundColor: renderEmpty(timeline, 'rgba(70, 144, 255, 1)'),
				},
				{
					label: `${Math.round(sentiment?.negative*100)}% Bad`,
					data: timeline?.map((item:any) => item?.negative),
					borderColor: '#F64BBC',
					fill: false,
					backgroundColor: renderEmpty(timeline, 'rgba(246, 75, 188, 1)'),
				},
				{
					label: `${Math.round(sentiment?.neutral*100)}% Neutral`,
					data: timeline?.map((item:any) => item?.neutral),
					borderColor: '#3E03A1',
					fill: false,
					backgroundColor: renderEmpty(timeline, 'rgba(62, 3, 161, 1)'),
				},
			],
		};
	}


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
					onClick={
						async () => {
							navigate('/')
							await fetch('http://127.0.0.1:5000/stop')
						}
					}
				>
					{data?.one?.hashtag + " vs. " + data?.two?.hashtag}
				</h1>
			</div>
			<GeneralInformation data={data}/>
			<div className="h-[6rem] pr-48 pl-24 flex w-full">
				<div className='w-full'>
					<div className='m-2 h-[90px]'>
						<div className='text-white text-[8px] text-center'>Roverta</div>
						<Line options={options} data={masterpiece(data?.one?.sentiment_timeline_rov, data?.one?.sentiment_average_rov )}/>
					</div>
					<div className='m-2 h-[90px]'>
						<div className='text-white text-[8px] text-center'>Our model</div>
						<Line options={options} data={masterpiece(data?.two?.sentiment_timeline_our, data?.two?.sentiment_average_our )}/>
					</div>
				</div>
				<div className='w-full'>
					<div className='m-2 h-[90px]'>
						<div className='text-white text-[8px] text-center'>Roverta</div>
						<Line options={options} data={masterpiece(data?.one?.sentiment_timeline_rov, data?.one?.sentiment_average_rov )}/>
					</div>
					<div className='m-2 h-[90px]'>
						<div className='text-white text-[8px] text-center'>Our model</div>
						<Line options={options} data={masterpiece(data?.two?.sentiment_timeline_our, data?.two?.sentiment_average_our )}/>
					</div>	
				</div>
			</div>
		</div>
	);
};

export default GlobeLayout;
