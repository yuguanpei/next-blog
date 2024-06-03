import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import yaml from "react-syntax-highlighter/dist/cjs/languages/prism/yaml";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("yaml", yaml);

import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import Image from "next/image";
export default function PostContent(props) {
  const { post } = props;

  const customComponents = {
    img(props) {
      const { node } = props;
      return (
        <div className={classes.image}>
          <Image
            src={node.properties.src}
            alt={node.properties.alt}
            width={600}
            height={300}
            layout="responsive"
            style={{
              maxWidth: "100%",
            }}
          />
        </div>
      );
    },
    code(props) {
      const { children, className, node, ...rest } = props;
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={atomDark}
        />
      ) : (
        <code {...rest} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={post.image} />
      <ReactMarkdown components={customComponents}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
