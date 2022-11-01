import React from 'react';
import { useNavigate } from 'react-router-dom'

const SearchLayout:React.FC = () => {
	const [search, setSearch] = React.useState<string>("#");
	const navigate = useNavigate();

	return (
		<div className="flex justify-center h-full">
			<div className="grid content-center">
				<form onSubmit={() => {
					fetch('http://localhost:5000/hashtag/'+search.replace('#', ''))
					navigate('/stream')

				}}>
					<h1 className="text-white text-7xl text-center">
						<input 
							type="text" 
							name="name" 
							style={{all:'unset', caretColor: 'transparent'}}
							value={search}
							onChange={search => setSearch('#'+search.target.value.replace(/(#|\s|[<>\-_\.`^\[\]\{\}ç¨´:,;=\(\)\/&%$·"!\+\*\?\¡\¿Ç…„–œæ€®†¥  øπå∫∂ƒ™¶§ ~Ω∑©√ß µñÑ≠”“÷¬∞¢#@\|≤≥\\ºª‚])/g,''))}
						/>
					</h1>
				</form>
			</div>
		</div>
	);
};

export default SearchLayout;
