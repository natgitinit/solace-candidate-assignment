import { useState } from "react";

type SpecialtiesCellProps = {
	specialties: string[];
};

const SpecialtiesCell = ({ specialties }: SpecialtiesCellProps) => {
	const [expanded, setExpanded] = useState(false);
	const toggleExpanded = () => setExpanded(!expanded);

	// Show only the first 2 specialties if not expanded.
	const displayedSpecialties = expanded ? specialties : specialties.slice(0, 2);

	return (
		<div className="space-y-1">
			{displayedSpecialties.map((s, index) => (
				<div key={index}>{s}</div>
			))}
			{specialties.length > 2 && (
				<button onClick={toggleExpanded} className="text-read-more text-sm">
					{expanded ? "− Read Less" : "+ Read More"}
				</button>
			)}
		</div>
	);
};

export default SpecialtiesCell;
