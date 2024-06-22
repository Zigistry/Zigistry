import { useState, useEffect } from 'preact/hooks';
import { Card, TextInput } from 'flowbite-react';
import { FaStar } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";
import { FaCodeFork } from "react-icons/fa6";
export function Home() {
	const [repository, setRepository] = useState(null);
	const url = "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json";

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
							className="w-72 my-2 hover:scale-110 transition-transform transform-cpu"
						>
							<img className="w-10 rounded-full" src={item.owner.avatar_url} />
							<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{item.name[0].toUpperCase() + item.name.slice(1, item.name.length)}
							</h5>
							<p className="text-gray-400">{item.full_name}</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								{item.description}
							</p>
							<p className="flex items-center">
								<FaStar size={20} color='#cfbc0e' />&nbsp;{item.stargazers_count}&nbsp;&nbsp;&nbsp;&nbsp; <FaEye color="skyblue" />&nbsp;{item.watchers_count}&nbsp;&nbsp;&nbsp;&nbsp;<FaCodeFork color="lightpink" />&nbsp;{item.forks_count}&nbsp;&nbsp;&nbsp;&nbsp;<GoIssueOpened color="lightgreen" />&nbsp;{item.open_issues}</p>
						</Card>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}