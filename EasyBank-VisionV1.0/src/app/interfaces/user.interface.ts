export interface User {
    user_number: string;
    first_name: string;
    last_name: string;
    debit_card: {
        dc_number: string,
        dc_avaliable_balance: number;
    }
    credit_cards?: credit_card[];
    password?: string;
}

export interface credit_card {
    cc_number: string;
    cc_avaliable_credit: number;
    cc_total_credit: number;
}