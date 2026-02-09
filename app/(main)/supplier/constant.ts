//ဒါက API ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const API_Variable = 'Supplier';
//ဒါက SweetAlert2 မှာသုံးတဲ့ Message ကို သတ်မှတ်တာပါ
export const Message_Variable = 'Supplier';
// ဒါက React ရဲ့ Router မှာသုံးတဲ့ Link ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const Next_Link_Variable = 'supplier';
//ဒါက Table မှာ ဘယ် column တွေကို ပြမလဲဆိုတာကို သတ်မှတ်တ
export const TableColumns = ['supplierName', 'phone', 'id'];
//ဒါက Form မှာသုံးတဲ့ Data Model ကို သတ်မှတ်တာပါ
export interface FormData {
    supplierName: string;
    phone: string;
    id: string;
}
