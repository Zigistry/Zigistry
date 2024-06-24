import { useState } from 'react';
import { Button, Card, TextInput } from 'flowbite-react';
import { FaStar, FaEye } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";
import { FaCodeFork } from "react-icons/fa6";
import Image from 'next/image';
import { IoMdFastforward } from "react-icons/io";


export default function Home({ most_used, top10LatestRepos }: any) {
	const [most_used_repo, set_most_used_repo] = useState(most_used);
	const [recent_repo, set_recent_repo] = useState(top10LatestRepos);
	const [unchangeable, setUnchangeable] = useState(most_used);

	const handleSearchChange = (event: any) => {
		if (event.target.value == "") {
			set_most_used_repo(unchangeable);
		}
		else {
			if (unchangeable) {
				const searchTerm = event.target.value.toLowerCase();
				const filteredList = unchangeable.filter((item: { full_name: string; description: string; }) =>
					item.full_name.toLowerCase().includes(searchTerm) ||
					(item.description && item.description.toLowerCase().includes(searchTerm))
				);

				set_most_used_repo(filteredList);
			}
		}
	};

	return (
		<div>
			<div className='flex flex-col items-center'>
				<h1 className="text-center font-semibold text-2xl my-5">Search Ziglang Packages</h1>
				<TextInput onInput={handleSearchChange} placeholder="Search libraries" id="base" type="text" sizing="md" className="w-72 mb-5" />
			</div>
			<h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded"><IoMdFastforward size={25} />&nbsp;Recently released:</h1>
			<div className="w-full flex flex-wrap justify-evenly">
				{most_used_repo ? (
					most_used_repo.map((item: any, index: any) => (
						<Card key={index} className="w-72 my-2 hover:scale-110 transition-transform transform-cpu">
							<Image width="50" height="50" className="w-10 rounded-full" src={item.owner.avatar_url} alt={item.name} />
							<h5 className="text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h5>
							<p className="text-gray-400">{item.full_name}</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
							<div className="flex items-center">
								<FaStar size={20} color='#cfbc0e' />&nbsp;{item.stargazers_count}
								&nbsp;&nbsp;&nbsp;&nbsp;<FaEye color="skyblue" />&nbsp;{item.watchers_count}
								&nbsp;&nbsp;&nbsp;&nbsp;<FaCodeFork color="lightpink" />&nbsp;{item.forks_count}
								&nbsp;&nbsp;&nbsp;&nbsp;<GoIssueOpened color="lightgreen" />&nbsp;{item.open_issues}
							</div>
							<Button href={item.full_name} color="dark" pill>
								View package
							</Button>
						</Card>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
			<h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded"><FaStar size={25} />&nbsp;Most used:</h1>
			<div className="w-full flex flex-wrap justify-evenly">
				{most_used ? (
					most_used.map((item: any, index: any) => (
						<Card key={index} className="w-72 my-2 hover:scale-110 transition-transform transform-cpu">
							<Image width="50" height="50" className="w-10 rounded-full" src={item.owner.avatar_url} alt={item.name} />
							<h5 className="text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h5>
							<p className="text-gray-400">{item.full_name}</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
							<div className="flex items-center">
								<FaStar size={20} color='#cfbc0e' />&nbsp;{item.stargazers_count}
								&nbsp;&nbsp;&nbsp;&nbsp;<FaEye color="skyblue" />&nbsp;{item.watchers_count}
								&nbsp;&nbsp;&nbsp;&nbsp;<FaCodeFork color="lightpink" />&nbsp;{item.forks_count}
								&nbsp;&nbsp;&nbsp;&nbsp;<GoIssueOpened color="lightgreen" />&nbsp;{item.open_issues}
							</div>
							<Button href={item.full_name} color="dark" pill>
								View package
							</Button>
						</Card>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}
interface Repo {
	created_at: string; 
	[key: string]: any; 
  }
  
  interface Data {
	items: Repo[];
  }
  
  export async function getServerSideProps() {
	try {
	  const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
	  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
	  
	  const data: Data = await response.json();
  
	  const sortedRepos = data.items.sort((a: Repo, b: Repo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
	  const top10LatestRepos = sortedRepos.slice(0, 10);
  
	  return {
		props: {
		  most_used: data.items.slice(0, 20),
		  top10LatestRepos,
		},
	  };
	} catch (error) {
	  console.error('Fetch error:', error);
	  return {
		props: {
		  most_used: [],
		  top10LatestRepos: [],
		},
	  };
	}
  }
  