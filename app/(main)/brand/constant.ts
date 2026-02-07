//ဒါက API ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const API_Variable = 'Brand';
//ဒါက SweetAlert2 မှာသုံးတဲ့ Message ကို သတ်မှတ်တာပါ
export const Message_Variable = 'Brand';
// ဒါက React ရဲ့ Router မှာသုံးတဲ့ Link ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const Next_Link_Variable = 'brand';
//ဒါက Table မှာ ဘယ် column တွေကို ပြမလဲဆိုတာကို သတ်မှတ်တာပါ
export const TableColumns = ['brandName', 'isActive', 'id'];
//ဒါက Form မှာသုံးတဲ့ Data Model ကို သတ်မှတ်တာပါ
export interface FormData {
    brandName: string;
    isActive: string;
    id: string;
}
