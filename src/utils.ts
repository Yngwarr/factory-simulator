export type TimeFormat = 'amount' | 'timer';

const RESOURCE_COLOR = [
    'blue-600',
    'red-600',
    'green-600',
    'yellow-600',
    'purple-600',
];

export function resourceColor(type: number, prefix = "bg") {
    return `${prefix}-${RESOURCE_COLOR[type]}`;
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

export function calculateCenter(rect: DOMRect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

export function deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}
