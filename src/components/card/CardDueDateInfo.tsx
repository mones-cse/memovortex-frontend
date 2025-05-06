export const CardDueDateInfo = ({ dueDate }: { dueDate: Date }) => {
	return (
		<p className="text-md text-gray-800">
			Due Date:{" "}
			{dueDate.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})}
		</p>
	);
};
