import {PicsumDetails} from './ContentState';
export interface HomeState {
    readonly activity: ReadonlyArray<string>;
    readonly loading: boolean;
    readonly searchLoading: boolean;
    readonly searchActivity: ReadonlyArray<string>;
}

export interface HomeDetails {
    readonly id: string;
    readonly details: PicsumDetails;
}
