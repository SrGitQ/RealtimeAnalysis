import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Bullet from '../Components/Bullet';
import socketIOClient from 'socket.io-client';
import { ForceGraph3D } from 'react-force-graph';
import { useNavigate } from 'react-router-dom'

type Props = {
	changeLayout: (layout: string) => void;
	data:any;
	network: any;
};

const GraphLayout:React.FC<Props> = ({ changeLayout, data, network }) => {
	const navigate = useNavigate();

	const ENDPOINT = 'http://localhost:5000'
	
	const closeSocket = () => {
		const socket = socketIOClient(ENDPOINT);
		socket.disconnect();
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
						() => {
							navigate('/')
							closeSocket()
						}

					}
				>
					{data.hashtag.includes('#') ? data.hashtag : `#${data.hashtag}`}
				</h1>
			</div>
			<div className='h-full flex justify-center pt-10'>
				<ForceGraph3D
					graphData={network}
					nodeLabel='id'
					nodeColor={() => '#FB71F2'}
					linkWidth={1}
					onNodeDragEnd={node => {
						node.fx = node.x;
						node.fy = node.y;
						node.fz = node.z;
					}
					
					
				}
				width={900}
				height={400}
				backgroundColor='rgba(0,0,0,0)'
				/>
			</div>
			<div className='h-28 flex justify-between pl-28 pr-28'>
				<Bullet title={'Tweets'} text={`${data.tweets}`}/>
				<Bullet title={'Users'} text={`${data.no_users}`}/>
				<Bullet title={'Hashtags'} text={`${data.hashtags}`}/>
			</div>
		</div>
	);
};

export default GraphLayout;
