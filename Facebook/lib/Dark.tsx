import { useState } from 'react';

export function useDark() {
    const [dark, setDark] = useState(false);

    return dark;
}
