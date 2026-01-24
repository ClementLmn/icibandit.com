import { useStoryblokApi, type ISbStoryData } from "@storyblok/astro";

import isDraft from "./isDraft";
import isPreview from "./isPreview";

export function getImageSize(image: { filename: string }) {
    const url = image.filename;

    if (!url || url === "") return { width: 0, height: 0 };

    return {
        width: parseInt(url.split("/")[5].split("x")[0]) as number,
        height: parseInt(url.split("/")[5].split("x")[1]) as number,
    };
}

export function parseUrl(
    url: string | undefined,
    language: string | undefined,
) {
    const slug = url || "accueil";
    const fullSlug = slug;
    return {
        language,
        fullSlug,
        data: null,
    };
}

export async function generateStaticPaths() {
    const storyblokApi = useStoryblokApi();

    const stories = await storyblokApi.getAll("cdn/stories", {
        version: isDraft() ? "draft" : "published",
        resolve_relations: ["accueil.projets"],
    });

    return stories.map((story: ISbStoryData) => {
        const fullSlug = story.full_slug;
        let slug: string | undefined = fullSlug;

        if (!isPreview() && fullSlug === "accueil") {
            slug = undefined;
        }

        return {
            props: {
                fullSlug,
                data: story,
            },
            params: {
                slug: slug !== "" ? slug : undefined,
            },
        };
    });
}
