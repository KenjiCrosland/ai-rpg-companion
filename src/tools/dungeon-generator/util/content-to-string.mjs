// src/util/contentArrayToString.mjs

export function contentArrayToString(contentArray) {
  // Initialize an array to hold the processed strings
  const result = [];

  // Iterate over each item in the contentArray
  contentArray.forEach((item) => {
    switch (item.format) {
      case 'read_aloud':
        // For read_aloud, we might want to enclose the text in quotation marks or italics
        result.push(`"${item.content}"\n`);
        break;
      case 'header':
        // For headers, we can make them uppercase and add line breaks for emphasis
        result.push(`\n${item.content.toUpperCase()}\n`);
        break;
      case 'paragraph':
        // For paragraphs, include the content as is
        result.push(`${item.content}\n`);
        break;
      default:
        // For any other formats, include the content without special formatting
        result.push(`${item.content}\n`);
        break;
    }
  });

  // Join the array into a single string
  return result.join('\n');
}

// src/util/dungeonOverviewToString.js
//
// Flattens a dungeon overview to plain prose for downstream contexts
// (monster-store passes this forward as thematic prompt context; some
// export sites use it too). Delegates to combineDungeonOverview so
// both new and legacy field shapes are handled in a single dual-read
// site — see ../util/combineDungeonOverview.mjs.
import { combineDungeonOverview } from './combineDungeonOverview.mjs';

export function dungeonOverviewToString(dungeonOverview) {
  if (!dungeonOverview) return '';
  // Title leads as a brief sentence-ender, mirroring the previous
  // string's lead format (title + body prose).
  const titlePart = dungeonOverview.title ? `${dungeonOverview.title} ` : '';
  // combined_content takes precedence (user-edited prose); otherwise
  // structured fields are combined into flat paragraphs.
  const body = (dungeonOverview.combined_content && dungeonOverview.combined_content.trim())
    || combineDungeonOverview(dungeonOverview);
  return [titlePart.trim(), body].filter(Boolean).join('\n\n');
}
