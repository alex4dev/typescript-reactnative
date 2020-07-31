export interface ContentState {
    readonly picsumMap: ReadonlyMap<string, PicsumDetails>;
}

export interface PicsumDetails {
    readonly id: string;
    readonly author: string;
    readonly width: string;
    readonly height: string;
    readonly url: string;
    readonly download_url: string;
}
