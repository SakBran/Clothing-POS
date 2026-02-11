//ဒါက API ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const API_Variable = 'User';
//ဒါက SweetAlert2 မှာသုံးတဲ့ Message ကို သတ်မှတ်တာပါ
export const Message_Variable = 'User';
// ဒါက React ရဲ့ Router မှာသုံးတဲ့ Link ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const Next_Link_Variable = 'user';
//ဒါက Table မှာ ဘယ် column တွေကို ပြမလဲဆိုတာကို သတ်မှတ်တ
export const TableColumns = ['name:အမည်', 'password:စကားဝှက်', 'permission:လုပ်ဆောင်ခွင့်', 'isActive:အတည်ပြုမှု', 'id'];
//ဒါက Form မှာသုံးတဲ့ Data Model ကို သတ်မှတ်တာပါ
export interface FormData {
    name: string;
    email: string;
    permission: string;
    password: string;
    isActive: string;
    fullName: string;
    id: string;
}
