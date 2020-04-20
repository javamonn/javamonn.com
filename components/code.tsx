import * as React from "react";
import hljs from "highlight.js/lib/highlight";
import hljsReason from 'highlight.js/lib/languages/reasonml'
hljs.registerLanguage('reasonml', hljsReason)


const Code = ({ children }) => {
  const content = hljs.highlight('reasonml', children).value;
  return (
    <pre className="overflow-x-auto">
      <code className="hljs" dangerouslySetInnerHTML={{ __html: content }} />
    </pre>
  );
};

export default Code;
