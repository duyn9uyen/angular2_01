// Using an interface to get type-checking
// Transpiling a class to JavaScript produces code. Transpiling an interface produces — nothing.
// So it is faster than using a class in that sense
export interface Month {
    id: string;
    name: string;
    disabled: boolean;
}