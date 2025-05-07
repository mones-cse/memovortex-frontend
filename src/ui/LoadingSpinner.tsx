export const LoadingSpinner = ({ text }: { text: string }) => (
	<p className="text-sm font-bold text-gray-900 mt-2">
		{text} <span className="inline-block animate-spin duration-[500ms]">↻</span>
	</p>
);
