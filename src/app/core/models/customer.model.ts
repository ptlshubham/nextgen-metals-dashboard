export class Customer {
    constructor(
        public id?: number,
        public FirstName?: string,
        public LastName?: string,
        public Salutation?: string,
        public Phone?: number,
        public Email?: string,
        public Role?: string,
        public CompanyName?: string,
        public Designation?:string,
        public GSTNo?:string,
        public CompanyContact?:string,
        public MaterialQuality?: string,
        public BankName?:string,
        public AvgMonthTrade?:number,
        public BankAccNo?: number,
        public AccType?: string,
        public AccHolderName?: string,
        public ISFCCode?: string,
        public BranchName?: string,
        public CancelCheque?: string,
        public PANCard?: string,
        public KYCStatus?:Boolean,
        public KYCDate?: string,
        public address?: string,
        public location?: string,
        public CreatedDate?: Date,
        public UpdatedDate?: Date,
    ) {

    }
}
