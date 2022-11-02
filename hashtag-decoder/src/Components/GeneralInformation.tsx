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
		<div className="h-2/3 flex ">
			<div className="w-1/5 flex flex-col space-y-8">
				<Bullet title="Tweets" text={`${data.tweets_count}`}/>
				<Bullet title="Users" text={`${data.users_count}`}/>
				<Bullet title="Mentions" text={`${data.mentions}`}/>
			</div>
			<div className="w-2/3">
				<GlobeRender marks={data.locations}/>
			</div>
			<div className="w-1/5 flex flex-col space-y-8">
				<Bullet title="Places" text={`${data.locations_count}`}/>
				<div className="w-18 flex flex-col m-auto">
					<div className="text-white flex justify-between w-[4rem]">
						<FontAwesomeIcon icon={solid('laptop')} />
						<div>{data?.devices?.web}</div>
					</div>
					<div className="text-white flex justify-between w-[4rem]">
						<FontAwesomeIcon icon={solid('apple-whole')} />
						<div>{data?.devices?.ios}</div>
					</div>
					<div className="text-white flex justify-between w-[4rem]">
						<FontAwesomeIcon icon={solid('mobile')} />
						<div>{data?.devices?.android}</div>
					</div>
				</div>
				<Bullet title="Verified Users" text={`${data.verified_count}`}/>
			</div>
		</div>
	);
};

export default GeneralInformation;
