import {useState, useRef, useEffect} from 'react';
import {findNodeHandle, UIManager} from 'react-native';

interface MeasureEvent {
    originX: number;
    originY: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
}

/**
 * Hook UIManager.measure()
 * return measure from provided React Component
 */
export function useMeasure(component: React.Component): MeasureEvent {
    const [measure, setMeasure] = useState<MeasureEvent>(null);
    useEffect(() => {
        if (!component) {
            return;
        }
        const tag: number = findNodeHandle(component);
        UIManager.measure(
            tag,
            (
                originX: number,
                originY: number,
                width: number,
                height: number,
                pageX: number,
                pageY: number
            ) => {
                if (!originX && !originY && !width && !height) {
                    // Dbg.warn('useMeasure', 'unexpected result');
                    return;
                }
                // Dbg.trace('useMeasure', 'result:', {originX, originY, width, height, pageX, pageY});
                setMeasure({originX, originY, width, height, pageX, pageY});
            }
        );
    }, [component]);
    return measure;
}
