export type TimeFormat = 'amount' | 'timer';

const RESOURCE_COLOR = [
    'bg-blue-600',
    'bg-red-600',
    'bg-green-600',
    'bg-yellow-600',
    'bg-purple-600',
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

export function renderTime(minutes: number, format: TimeFormat = 'amount') {
    if (minutes === 0) {
        switch (format) {
            case 'amount':
                return '0';
            case 'timer':
                return '0:00';
        }
    }

    const hours = (minutes / 60) | 0;
    const minutesLeft = (minutes % 60) | 0;

    switch (format) {
        case 'amount':
            return (
                (hours > 0 ? `${hours}h` : '') +
                (minutesLeft > 0 ? `${minutesLeft}m` : '')
            );
        case 'timer':
            return `${hours}:${minutesLeft < 10 ? `0${minutesLeft}` : `${minutesLeft}`}`;
    }
}
