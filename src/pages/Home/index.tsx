import { useState, useEffect } from 'react';
import { Card, TextInput } from 'flowbite-react';

export function Home() {
	const [repository, setRepository] = useState(null);
	const url = "https://api.github.com/search/repositories?q=topic:zig-package&page=1&per_page=100";

	useEffect(() => {
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok ' + response.statusText);
				}
				return response.json();
			})
			.then(data => {
				setRepository(data.items);
			})
			.catch(error => {
				console.error('There has been a problem with your fetch operation:', error);
			});
	}, []);

	return (
		<div>
			<div className="flex justify-center">
				<div className="w-72">
					<h1 className="text-center font-semibold text-2xl my-5">Search Ziglang Packages</h1>
					<TextInput className="" placeholder="Search libraries" id="base" type="text" sizing="md" />
				</div>
			</div>
			<div className="w-full flex flex-wrap justify-evenly">
				{repository ? (
					repository.map((item, index) => (
						<Card
							key={index}
							className="max-w-sm my-2 hover:scale-110 transition-transform transform-cpu"
							renderImage={() => (
								<img
									width={500}
									height={500}
									src={item.owner.avatar_url}
									alt={item.name}
								/>
							)}
						>
							<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{item.name}
							</h5>
							<p className="text-gray-400">{item.full_name}</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								{item.description}
							</p>
						</Card>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>

		</div>
	);
}
