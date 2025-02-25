"use client";

import { useEffect, useState } from "react";
import SpecialtiesCell from "./SpecialtiesCell";

type Advocate = {
	id: number;
	firstName: string;
	lastName: string;
	city: string;
	degree: string;
	specialties: string[];
	yearsOfExperience: number;
	phoneNumber: number;
};

const normalizeString = (str: string) =>
	str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

export default function Home() {
	const [advocates, setAdvocates] = useState<Advocate[]>([]);
	const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		console.log("fetching advocates...");
		fetch("/api/advocates").then((response) => {
			response.json().then((jsonResponse) => {
				setAdvocates(jsonResponse.data);
				setFilteredAdvocates(jsonResponse.data);
			});
		});
	}, []);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		setSearchTerm(term);
		const normalizedTerm = normalizeString(term.trim());

		console.log("filtering advocates...");
		const filteredAdvocates = advocates.filter((advocate) => {
			const fullName = `${advocate.firstName.toLowerCase()} ${advocate.lastName.toLowerCase()}`;

			return (
				fullName.includes(normalizedTerm) ||
				advocate.firstName.toLowerCase().includes(normalizedTerm) ||
				advocate.lastName.toLowerCase().includes(normalizedTerm) ||
				advocate.city.toLowerCase().includes(normalizedTerm) ||
				advocate.degree.toLowerCase().includes(normalizedTerm) ||
				advocate.specialties.some((s) =>
					normalizeString(s).includes(normalizedTerm)
				) ||
				advocate.yearsOfExperience.toString().includes(normalizedTerm)
			);
		});

		setFilteredAdvocates(filteredAdvocates);
	};

	const onClick = () => {
		setSearchTerm("");
		setFilteredAdvocates(advocates);
	};

	return (
		<main style={{ margin: "24px" }}>
			<h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
				Solace Advocates
			</h1>
			<br />
			<br />
			<div>
				<div className="relative w-full max-w-xs">
					<span className="absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							className="w-5 h-5 text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3 7.5 7.5 0 0116.65 16.65z"
							/>
						</svg>
					</span>
					<input
						type="text"
						placeholder="Search"
						onChange={onChange}
						value={searchTerm}
						className="block w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-solace-green focus:outline-none"
					/>
				</div>
				<button
					onClick={onClick}
					className="mt-2 text-sm text-white bg-reset-btn hover:bg-[#1C4339] px-4 py-2 rounded"
				>
					Reset
				</button>
			</div>
			<br />
			<br />
			{filteredAdvocates === null ? (
				<p>Loading...</p>
			) : (
				<div className="overflow-x-auto">
					<table className="table-auto w-full">
						<thead className="bg-gray-50 dark:bg-gray-800">
							<tr className="bg-table-header text-gray-100 text-sm leading-normal">
								<th className="py-3 px-6 text-left w-[150px]">First Name</th>
								<th className="py-3 px-6 text-left w-[150px]">Last Name</th>
								<th className="py-3 px-6 text-left">City</th>
								<th className="py-3 px-6 text-left">Degree</th>
								<th className="py-3 px-6 text-left">Specialties</th>
								<th className="py-3 px-6 text-left">Years of Experience</th>
								<th className="py-3 px-6 text-left">Phone Number</th>
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm font-light">
							{filteredAdvocates.map((advocate) => (
								<tr
									key={advocate.id}
									className="border-b border-gray-200 hover:bg-gray-100"
								>
									<td className="py-3 px-6 text-left">{advocate.firstName}</td>
									<td className="py-3 px-6 text-left">{advocate.lastName}</td>
									<td className="py-3 px-6 text-left">{advocate.city}</td>
									<td className="py-3 px-6 text-left">{advocate.degree}</td>
									<td className="py-3 px-6 text-left">
										<SpecialtiesCell specialties={advocate.specialties} />
									</td>
									<td className="py-3 px-6 text-left">
										{advocate.yearsOfExperience}
									</td>
									<td className="py-3 px-6 text-left">
										{advocate.phoneNumber}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</main>
	);
}
