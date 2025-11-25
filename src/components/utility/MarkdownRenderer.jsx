import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function MarkdownRenderer({ markdown }) {
    const allowed = [
        'p', 'em', 'strong', 'del', 'ul', 'ol', 'li', // Basic structure
        'text', 'code', 'inlineCode', // Text and code
        'break', 'thematicBreak', 'pre',// Separators
        'span', 'div' //math
    ];

    const disallowed = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    

    return (
        <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkMath]} // Parses the LaTeX syntax
            rehypePlugins={[rehypeKatex]} // Renders the parsed math using KaTeX
            allowedElements={allowed}
            //disallowedElements={disallowed}
        />
    );
}
