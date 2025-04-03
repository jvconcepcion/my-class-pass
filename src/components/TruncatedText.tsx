import { TruncatedTextProps } from '@lib/types';
import { useState } from 'react';

const TruncatedText: React.FC<TruncatedTextProps> = ({ text = "", maxSentences = 5, withReadMore = false }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  // Ensure text is always a string
  const safeText = text || "";

  // Split text into sentences
  const sentences: string[] = safeText.match(/[^.!?]+[.!?]/g) || [safeText];

  // Check if truncation is needed
  const isTruncated = sentences.length > maxSentences;
  const truncatedText = sentences.slice(0, maxSentences).join(" ") + (isTruncated ? "..." : "");

  return (
    <span>
      {expanded || !isTruncated ? safeText : truncatedText}
      {isTruncated && withReadMore && !expanded && (
        <span className="text-blue-500 cursor-pointer" onClick={() => setExpanded(true)}>
          {" "}Read More
        </span>
      )}
    </span>
  );
};

export default TruncatedText;
