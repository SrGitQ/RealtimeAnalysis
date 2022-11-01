import React from 'react';

type BulletProps = {
	title:string,
	text:string,
}

const Bullet:React.FC<BulletProps>  = ({title, text}) => {
	return (
		<div className="w-18 text-center">
			<span className="text-[#BFC0C2]">{title}</span>
			<br/>
			<span className="text-white text-3xl">{text}</span>
		</div>
	);
};

export default Bullet;
