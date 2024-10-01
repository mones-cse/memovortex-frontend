import { Button, Table } from "@mantine/core";
import { FaRegTrashAlt } from "react-icons/fa";
import type { TCardData } from "../../types/card.type";

interface TableViewProps {
	data: TCardData[];
	onSelectCard: (card: TCardData) => void;
	onDeleteCard: (card: TCardData) => void;
}

const TableView: React.FC<TableViewProps> = ({
	data,
	onSelectCard,
	onDeleteCard,
}) => {
	return (
		<Table striped highlightOnHover>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Front Text</Table.Th>
					<Table.Th className="float-end">Actions</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{data.map((each: TCardData) => (
					<Table.Tr key={each.card.id} onClick={() => onSelectCard(each)}>
						<Table.Td>{each.cardContent.frontText}</Table.Td>
						<Table.Td className="float-end flex gap-1 items-center">
							<Button
								variant="outline"
								size="compact-xs"
								onClick={() => onDeleteCard(each)}
							>
								<FaRegTrashAlt color="red" />
							</Button>
						</Table.Td>
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	);
};

export default TableView;
