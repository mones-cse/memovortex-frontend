import { DEFAULT_THEME, Text } from "@mantine/core";
import { spread } from "axios";
import { useState } from "react";
import { MainContainer } from "../ui/MainContainer";

const Test = () => {
	const [value, onChange] = useState("#fff");

	const swatches = [
		...DEFAULT_THEME.colors.red.slice(0, 7),
		...DEFAULT_THEME.colors.green.slice(0, 7),
	];

	const CustomSwatches = ({
		swatches,
		value,
		onChange,
	}: { swatches: string[]; value: string; onChange: (x: string) => void }) => {
		return (
			<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
				{swatches.map((color: string) => (
					<button
						type="button"
						key={color}
						onClick={() => onChange(color)}
						style={{
							backgroundColor: color,
							cursor: "pointer",
							width: 30,
							height: 30,
							border:
								color === value ? "2px solid black" : "2px solid transparent",
							borderRadius: "50%",
						}}
					/>
				))}
			</div>
		);
	};

	return (
		<MainContainer withSpace>
			<CustomSwatches swatches={swatches} value={value} onChange={onChange} />
			<Text>Selected color: {value}</Text>
		</MainContainer>
	);
};

export default Test;
