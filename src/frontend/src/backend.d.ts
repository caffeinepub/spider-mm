import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface WaitlistEntry {
    email: Email;
    timestamp: Timestamp;
}
export type Email = string;
export interface backendInterface {
    addToWaitlist(email: Email): Promise<void>;
    getAllWaitlistEntriesSorted(): Promise<Array<WaitlistEntry>>;
    getTotalWaitlistEntries(): Promise<bigint>;
}
