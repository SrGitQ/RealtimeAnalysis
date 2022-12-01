import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Bullet from '../Components/Bullet';
import { ForceGraph3D } from 'react-force-graph';
import { useNavigate } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
	ArcElement, 
	Tooltip, 
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
);

type Props = {
	changeLayout: (layout: string) => void;
	data:any;
};


export const options_bar = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		}
	},
    maintainAspectRatio: false,
	scales:{
		x: {
			grid: {
				display: false
			},
			stacked: true
		},
		y: {
			grid: {
				display: false
			},
            ticks: {
                display: false,
            },
			stacked: true
		}
	},

}

const GraphLayout:React.FC<Props> = ({changeLayout, data}) => {
	const navigate = useNavigate();
	// console.log(network)
	const [tweetGen, setTweetGen] = useState({
		tweet:'Hello world',
		pred:'Hello world'
	})

	const data_bar_one = {
		labels:Object.keys(data?.one?.sentiment_general_timeline)?.map(e => e.split(' ')[1]),
		datasets:[
			{
				label: 'positive',
				data:Object.keys(data.one.sentiment_general_timeline).map(e => {
					return data.one.sentiment_general_timeline[e as keyof typeof data.one.sentiment_general_timeline].positive
				}),
				backgroundColor: '#4591ff',
			},
			{
				label: 'neutral',
				data:Object.keys(data.one.sentiment_general_timeline).map(e => {
					return data.one.sentiment_general_timeline[e as keyof typeof data.one.sentiment_general_timeline].neutral
				}),
				backgroundColor: '#3e03a1',
			},
			{
				label: 'negative',
				data:Object.keys(data.one.sentiment_general_timeline).map(e => {
					return data.one.sentiment_general_timeline[e as keyof typeof data.one.sentiment_general_timeline].negative
				}),
				backgroundColor: '#f74bbc',
			}
		]
	}
	const data_bar_two = {
		labels:Object.keys(data?.two?.sentiment_general_timeline)?.map(e => e.split(' ')[1]),
		datasets:[
			{
				label: 'positive',
				data:Object.keys(data.two.sentiment_general_timeline).map(e => {
					return data.two.sentiment_general_timeline[e as keyof typeof data.two.sentiment_general_timeline].positive
				}),
				backgroundColor: '#4591ff',
			},
			{
				label: 'neutral',
				data:Object.keys(data.two.sentiment_general_timeline).map(e => {
					return data.two.sentiment_general_timeline[e as keyof typeof data.two.sentiment_general_timeline].neutral
				}),
				backgroundColor: '#3e03a1',
			},
			{
				label: 'negative',
				data:Object.keys(data.two.sentiment_general_timeline).map(e => {
					return data.two.sentiment_general_timeline[e as keyof typeof data.two.sentiment_general_timeline].negative
				}),
				backgroundColor: '#f74bbc',
			}
		]
	}

	return (
		<div className="h-full flex flex-col">
			<div 
				className="h-[1.5rem] text-[#172158] text-center text-xl font-[1200]"
				onClick={() => changeLayout('globe')}
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
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<div className='h-full flex justify-center pt-10 w-[80rem] m-auto space-x-5'>
				<div>
					<div className='text-white text-[12px] text-center'>pop</div>
					<div><Bar options={options_bar} data={data_bar_one}/></div>
				</div>
				<div>
					<div className='text-white text-[12px] text-center'>pop</div>
					<div><Bar options={options_bar} data={data_bar_two}/></div>

				</div>
			</div>
			<br/>
			<br/>
			<br/>
			<br/>
			<div className='h-28 flex justify-between pl-28 pr-28'>
				<Bullet title={'Tweets'} text={`${data?.one?.tweets_count} | ${data?.two?.tweets_count}`}/>
				<Bullet title={'Users'} text={`${data?.one?.users_count} | ${data?.two?.users_count}`}/>
				<Bullet title={'Hashtags'} text={`${data?.one?.hashtags_count} | ${data?.two?.hashtags_count}`}/>
			</div>
			<div className=''>
				<div className='flex'>
					<div className='w-1/2 h-[10rem] p-4 grid place-content-center text-white text-[2rem]'>
						<div className='text-center'>{tweetGen.tweet}</div>
					</div>
					<div className='w-1/2 h-[10rem] p-4 grid place-content-center text-white text-[2rem]'>
						<div className='text-center'>{tweetGen.pred}</div>
					</div>
				</div>
				<div className='grid place-content-center '>
					<button className='bg-[#4591ff] text-white w-[15rem] h-[3rem] text-center text-[20px] rounded-xl'>Generate</button>
				</div>
			</div>
		</div>
	);
};

export default GraphLayout;
