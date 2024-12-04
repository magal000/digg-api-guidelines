export function isValidApplicationJson(property: string): boolean {
    return !!property.match(/application\/json(?:$|;[\s]*charset=.*)/)
}