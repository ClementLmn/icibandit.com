export default function isPreview() {
    // Netlify load it as a Boolean
    return (
        import.meta.env.STORYBLOK_PREVIEW === "true" ||
        import.meta.env.STORYBLOK_PREVIEW === true
    );
}
