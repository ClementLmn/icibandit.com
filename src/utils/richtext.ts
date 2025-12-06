/**
 * Check if a Storyblok rich text content has actual content
 * @param content - The rich text content from Storyblok
 * @returns boolean - true if there is actual content, false if empty or only whitespace
 */
export function hasRichTextContent(content: any): boolean {
    if (!content || !content.content || !Array.isArray(content.content)) {
        return false;
    }

    // Check recursively for actual text content
    const checkNodes = (nodes: any[]): boolean => {
        for (const node of nodes) {
            if (
                node.type === "text" &&
                node.text &&
                node.text.trim().length > 0
            ) {
                return true;
            }
            if (node.type === "image" || node.type === "blok") {
                return true;
            }
            if (
                node.content &&
                Array.isArray(node.content) &&
                checkNodes(node.content)
            ) {
                return true;
            }
        }
        return false;
    };

    return checkNodes(content.content);
}
