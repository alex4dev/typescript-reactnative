import {useState, useRef, useEffect} from 'react';
import {Keyboard, EmitterSubscription} from 'react-native';

/**
 *
 */
export function useKeyboardStatus(): boolean {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const keyboardShowListener = useRef<EmitterSubscription>(null);
    const keyboardHideListener = useRef<EmitterSubscription>(null);

    useEffect(() => {
        keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () =>
            setIsOpen(true)
        );
        keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () =>
            setIsOpen(false)
        );
        return (): void => {
            keyboardShowListener.current.remove();
            keyboardHideListener.current.remove();
        };
    }, []);
    return isOpen;
}
