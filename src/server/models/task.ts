import { ObjectId } from "mongodb";

export default class Task {
    constructor(
        public name: string,
        public day: number,
        public category: string,
        public id?: ObjectId
    ) { }
}