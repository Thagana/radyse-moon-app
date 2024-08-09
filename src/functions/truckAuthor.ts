export default function truckAuthor(author: string) {
    if (author.length > 17) {
        return `${author.slice(0, 17)}...`;
    }
    return author;
}