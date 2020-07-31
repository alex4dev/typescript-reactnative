import {useState, useRef, useEffect} from 'react';
import {Keyboard, EmitterSubscription} from 'react-native';

/**
 * Hook Listener Keyboardevent
 * return keiboardheight
 */
export function useKeyboardHeight(initialHeight = 0): number {
    const [height, setHeight] = useState<number>(initialHeight);
    const keyboardShowListener = useRef<EmitterSubscription>(null);
    const keyboardHideListener = useRef<EmitterSubscription>(null);

    useEffect(() => {
        keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', (event) =>
            setHeight(event.endCoordinates.height)
        );
        keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setHeight(0));
        return () => {
            keyboardShowListener.current.remove();
            keyboardHideListener.current.remove();
        };
    }, []);
    return height;
}
