import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-[#0F0F11] font-mono text-xs sm:text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#18181B] border-b border-zinc-800 text-zinc-400">
        <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-0.5 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-zinc-200 leading-relaxed font-mono">
        <pre>{code.trim()}</pre>
      </div>
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parse markdown into structured tokens
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockBuffer: string[] = [];
  let listBuffer: string[] = [];
  let inList = false;
  let isNumberedList = false;

  const flushList = () => {
    if (listBuffer.length > 0) {
      if (isNumberedList) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="my-4 pl-6 space-y-2 list-decimal text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            {listBuffer.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-4 pl-6 space-y-2 list-disc text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            {listBuffer.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
      }
      listBuffer = [];
      inList = false;
    }
  };

  const formatInline = (text: string): string => {
    let formatted = text;
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-zinc-900 dark:text-zinc-100">$1</strong>');
    // Italics
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    // Inline code
    formatted = formatted.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-800 dark:text-emerald-400 font-mono text-xs sm:text-sm">$1</code>'
    );
    // Links
    formatted = formatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-emerald-600 dark:text-emerald-400 underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    return formatted;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <CodeBlock
            key={`code-${elements.length}`}
            language={codeBlockLang}
            code={codeBlockBuffer.join('\n')}
          />
        );
        inCodeBlock = false;
        codeBlockLang = '';
        codeBlockBuffer = [];
      } else {
        flushList();
        inCodeBlock = true;
        codeBlockLang = line.trim().replace(/^```/, '');
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockBuffer.push(line);
      continue;
    }

    // Check headings
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-3"
          dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^### /, '')) }}
        />
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800"
          dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^## /, '')) }}
        />
      );
      continue;
    }

    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1
          key={`h1-${elements.length}`}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mt-12 mb-4"
          dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^# /, '')) }}
        />
      );
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---' || line.trim() === '***') {
      flushList();
      elements.push(
        <hr key={`hr-${elements.length}`} className="my-8 border-zinc-200 dark:border-zinc-800" />
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote
          key={`quote-${elements.length}`}
          className="my-4 pl-4 border-l-2 border-emerald-500 text-zinc-600 dark:text-zinc-400 italic text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^> /, '')) }}
        />
      );
      continue;
    }

    // Unordered List
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      inList = true;
      isNumberedList = false;
      listBuffer.push(line.trim().replace(/^[-*]\s+/, ''));
      continue;
    }

    // Numbered List
    if (/^\d+\.\s+/.test(line.trim())) {
      inList = true;
      isNumberedList = true;
      listBuffer.push(line.trim().replace(/^\d+\.\s+/, ''));
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      flushList();
      continue;
    }

    // Standard paragraph
    flushList();
    elements.push(
      <p
        key={`p-${elements.length}`}
        className="my-4 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatInline(line) }}
      />
    );
  }

  flushList();

  return <div className="prose-custom max-w-none">{elements}</div>;
};
