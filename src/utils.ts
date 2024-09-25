const RESOURCE_COLOR = [
    "bg-blue-600",
    "bg-red-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-purple-600"
];

export function resourceColor(type: number) {
    return RESOURCE_COLOR[type];
}

export function hashCode(obj: any) {
	const str = JSON.stringify(obj);
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        const chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
