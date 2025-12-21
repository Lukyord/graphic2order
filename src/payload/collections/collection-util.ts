export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and') // Replace & with "and"
    .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}
