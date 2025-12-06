export default function isDraft() {
    return import.meta.env.DRAFT === "true" || import.meta.env.DRAFT === true;
}
