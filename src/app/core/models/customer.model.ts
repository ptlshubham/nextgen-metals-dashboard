export class Customer {
    constructor(
        public id?: number,
        public cname?: string,
        public email?: string,
        public contact?: number,
        public address?: string,
        public gst?:string,
        public desigination?:string,
        public workPhone?:number,
        public role?: string,
        public comname?: string,
        public quality?: string,
        public status?:Boolean,
        public isactive?: Boolean,
        public createddate?: Date,
        public updateddate?: Date,
    ) {

    }
}
