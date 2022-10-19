export class Customer {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public salutation?: string,
        public phone?: number,
        public email?: string,
        public role?: string,
        public companyName?: string,
        public desigination?:string,
        public GST_no?:string,
        public company_contact?:string,
        public material_quality?: string,
        public bank_name?:string,
        public bank_acc_no?: string,
        public acc_type?: string,
        public acc_holder_name?: string,
        public ifsc_code?: string,
        public branch_name?: string,
        public cancel_cheque?: string,
        public PAN_card?: string,
        public KYC_status?:Boolean,
        public KYC_date?: string,
        public address?: string,
        public location?: string,
        public created_date?: Date,
        public updated_date?: Date,
    ) {

    }
}
