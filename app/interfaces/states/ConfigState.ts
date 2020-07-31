import {AlertNames} from 'constants/alertConstants';

export interface ConfigState {
    readonly openFromLink: boolean;
    readonly activeAlert: AlertNames;
    readonly darkMode: boolean;
}
