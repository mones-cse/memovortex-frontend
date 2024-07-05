type CustomColorPickerProps = {
	value: string;
	onChange: (x: string) => void;
};

const swatches = [
	"#FFFFFF",
	"#01D4FF",
	"#FFC971",
	"#B692FE",
	"#E4EE90",
	"#E8E9ED",
	"#FF9B73",
	"#fbcfe8",
];

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
	value,
	onChange,
}) => (
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
					border: color === value ? "2px solid #444" : "1px solid #ccc",
					borderRadius: "50%",
				}}
			/>
		))}
	</div>
);
