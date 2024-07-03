import "@mantine/tiptap/styles.css";
import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MainContainer } from "../ui/MainContainer";
// import CodeBlock from "@tiptap/extension-code-block";
const content =
	'<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

// const content =
// "<h1>Heading </h1><p>Test message <sub>123</sub><sup><sub>345</sub></sup></p>";

const About = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,

			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		editable: true,
		// onUpdate(props) {
		// 	const contentSample = props.editor.getHTML();
		// 	console.log("🚀 ~ onUpdate ~ content:", contentSample);
		// },
		content,
	});

	const editor2 = useEditor({
		extensions: [
			StarterKit,

			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		editable: false,
		// onUpdate(props) {
		// 	const contentSample = props.editor.getHTML();
		// 	console.log("🚀 ~ onUpdate ~ content:", contentSample);
		// },
		content,
	});

	return (
		<MainContainer withSpace>
			<p className="text-3xl text-center mb-4"> Rich Editor test code </p>

			<RichTextEditor editor={editor}>
				<RichTextEditor.Toolbar sticky stickyOffset={60}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
						<RichTextEditor.Strikethrough />
						<RichTextEditor.ClearFormatting />
						<RichTextEditor.Highlight />
						<RichTextEditor.Code />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Blockquote />
						<RichTextEditor.Hr />
						<RichTextEditor.BulletList />
						<RichTextEditor.OrderedList />
						<RichTextEditor.Subscript />
						<RichTextEditor.Superscript />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Link />
						<RichTextEditor.Unlink />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.AlignLeft />
						<RichTextEditor.AlignCenter />
						<RichTextEditor.AlignJustify />
						<RichTextEditor.AlignRight />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Undo />
						<RichTextEditor.Redo />
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>

				<RichTextEditor.Content />
			</RichTextEditor>
			<br />
			<RichTextEditor editor={editor2}>
				<RichTextEditor.Content />
			</RichTextEditor>
		</MainContainer>
	);
};

export default About;
