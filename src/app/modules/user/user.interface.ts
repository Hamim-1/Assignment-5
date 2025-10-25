export enum Role {
    SENDER = "SENDER",
    RECEIVER = "RECEIVER",
    ADMIN = "ADMIN",
}
export enum Status {
    BLOCKED = "BLOCKED",
    ACTIVE = "ACTIVE",
}
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: Role;
    status: Status;
}
