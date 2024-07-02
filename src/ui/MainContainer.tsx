type ChildNode = {
	children: React.ReactNode;
	withSpace?: boolean;
};

export const MainContainer: React.FC<ChildNode> = ({
	children,
	withSpace = false,
}) => {
	return withSpace ? (
		<div className="p-4">{children}</div>
	) : (
		<div
			className="
            bg-gray-100
            flex
            flex-col
            parent
			min-h-[calc(100vh-48px)]
			sm:min-h-[calc(100vh-60px)]
			lg:min-h-[calc(100vh-76px)]
		   "
		>
			{children}
		</div>
	);
};
