//ဒါက API ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const API_Variable = 'Branch';
//ဒါက SweetAlert2 မှာသုံးတဲ့ Message ကို သတ်မှတ်တာပါ
export const Message_Variable = 'Branch';
// ဒါက React ရဲ့ Router မှာသုံးတဲ့ Link ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const Next_Link_Variable = 'branch';
//ဒါက Table မှာ ဘယ် column တွေကို ပြမလဲဆိုတာကို သတ်မှတ်တာပá
export const TableColumns = ['branchName:ဆိုင်ခွဲအမည်', 'address:လိပ်စာ', 'id'];
//ဒါက Form မှာသုံးတဲ့ Data Model ကို သတ်မှတ်တာပါ
export interface FormData {
    branchName: string;
    address: string;
    id: string;
}
