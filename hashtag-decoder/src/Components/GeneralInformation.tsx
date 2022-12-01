import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Bullet from './Bullet';
import GlobeRender from './GlobeRender';

type Props = {
	data: any,
}

const GeneralInformation: React.FC <Props> = ({ data }) => {
	return (
		<div className="h-[28rem] flex">
			<div className="w-1/5 flex flex-col space-y-8">
				<Bullet title="Tweets" text={`${data?.one?.tweets_count} | ${data?.two?.tweets_count}`}/>
				<Bullet title="Users" text={`${data?.one?.users_count} | ${data?.two?.users_count}`}/>
				<Bullet title="Mentions" text={`${data?.one?.mentions} | ${data?.two?.mentions}`}/>
			</div>
			<div className="w-2/3">
				<GlobeRender marks={data}/>
			</div>
			<div className="w-1/5 flex flex-col space-y-8">
				<Bullet title="Places" text={`${data?.one?.locations_count} | ${data?.two?.locations_count}`}/>
				<div className="w-18 flex flex-col m-auto">
					<div className="text-white flex justify-between w-[4rem]">
						<FontAwesomeIcon icon={solid('laptop')} />
						<div>{data?.one?.devices?.web} | {data?.two?.devices?.web}</div>
					</div>
					<div className="text-white flex justify-between w-[4rem]">
						<FontAwesomeIcon icon={solid('apple-whole')} />
						<div>{data?.one?.devices?.ios} | {data?.two?.devices?.ios}</div>
					</div>
					<div className="text-white flex justify-between w-[4rem]">
						<FontAwesomeIcon icon={solid('mobile')} />
						<div>{data?.one?.devices?.android} | {data?.two?.devices?.android}</div>
					</div>
				</div>
				<Bullet title="Verified Users" text={`${data?.one?.verified_count} | ${data?.two?.verified_count}`}/>
			</div>
		</div>
	);
};

export default GeneralInformation;
