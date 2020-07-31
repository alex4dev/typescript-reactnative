import Reactotron from 'reactotron-react-native';
import Config from 'config/DebugConfig';

export enum DbgLevel {
    ALL = 0,
    TRACE = 1,
    DEBUG = 2,
    INFO = 3,
    WARNING = 4,
    ERROR = 5,
    NONE = 6
}

export default abstract class Dbg {
    private static level: DbgLevel = DbgLevel.ALL;

    public static setLevel(value: DbgLevel): void {
        Dbg.level = value;
    }

    public static trace(source: any, message: any, optionalParams?: any): void {
        if (Dbg.level <= DbgLevel.TRACE) {
            if (Config.useReactotron) {
                Reactotron.display({
                    name: 'TRACE',
                    preview: (source && source.length > 0 ? source + ' - ' : '') + message,
                    value: optionalParams
                });
            } else if (Config.useConsole) {
                // eslint-disable-next-line no-console
                console.log(
                    (source ? source + ' - ' : '') + message,
                    optionalParams ? optionalParams : ''
                );
            }
        }
    }
    public static debug(source: any, message: any, optionalParams?: any): void {
        if (Dbg.level <= DbgLevel.DEBUG) {
            if (Config.useReactotron) {
                Reactotron.display({
                    name: 'DEBUG',
                    preview: (source && source.length > 0 ? source + ' - ' : '') + message,
                    value: optionalParams
                });
            } else if (Config.useConsole) {
                // eslint-disable-next-line no-console
                console.debug(
                    (source ? source + ' - ' : '') + message,
                    optionalParams ? optionalParams : ''
                );
            }
        }
    }
    public static info(source: any, message: any, optionalParams?: any): void {
        if (Dbg.level <= DbgLevel.INFO) {
            if (Config.useReactotron) {
                Reactotron.display({
                    name: 'INFO',
                    preview: (source && source.length > 0 ? source + ' - ' : '') + message,
                    value: optionalParams,
                    important: true,
                    image: 'https://placebear.com/400/400'
                });
            } else if (Config.useConsole) {
                // eslint-disable-next-line no-console
                console.info(
                    (source ? source + ' - ' : '') + message,
                    optionalParams ? optionalParams : ''
                );
            }
        }
    }
    public static warn(source: any, message: any, optionalParams?: any): void {
        if (Dbg.level <= DbgLevel.WARNING) {
            if (Config.useReactotron) {
                Reactotron.display({
                    name: 'WARN',
                    preview: (source && source.length > 0 ? source + ' - ' : '') + message,
                    value: optionalParams,
                    important: true
                });
            } else if (Config.useConsole) {
                // eslint-disable-next-line no-console
                console.warn(
                    (source ? source + ' - ' : '') + message,
                    optionalParams ? optionalParams : ''
                );
            }
        }
    }
    public static error(source: string, message: any, optionalParams?: any): void {
        if (Dbg.level <= DbgLevel.ERROR) {
            if (Config.useReactotron) {
                Reactotron.display({
                    name: 'ERROR',
                    preview: (source && source.length > 0 ? source + ' - ' : '') + message,
                    value: optionalParams,
                    important: true
                });
            } else if (Config.useConsole) {
                // eslint-disable-next-line no-console
                console.error(
                    (source ? source + ' - ' : '') + message,
                    optionalParams ? optionalParams : ''
                );
            }
        }
    }

    public static connectConsoleToReactotron(): void {
        /* eslint-disable no-console */
        console.info = Reactotron.logImportant;
        console.log = Reactotron.log;
        console.warn = Reactotron.warn;
        console.error = Reactotron.error;
    }
}
