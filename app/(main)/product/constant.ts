//ဒါက API ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const API_Variable = 'Product';
//ဒါက SweetAlert2 မှာသုံးတဲ့ Message ကို သတ်မှတ်တာပါ
export const Message_Variable = 'Product';
// ဒါက React ရဲ့ Router မှာသုံးတဲ့ Link ကို ဘယ်လိုခေါ်မလဲဆိုတာကို သတ်မှတ်တာပါ
export const Next_Link_Variable = 'product';
//ဒါက Table မှာ ဘယ် column တွေကို ပြမလဲဆိုတာကို သတ်မှတ်တာပá
export const TableColumns = ['productName:ပစ္စည်းအမည်', 'brand:အမှတ်တံဆိပ်', 'description:ဖော်ပြချက်', 'category:အမျိုးအစား', 'isActive:အတည်ပြုမှု', 'id'];
//ဒါက Form မှာသုံးတဲ့ Data Model ကို သတ်မှတ်တာပါ
export interface ProductVariantForm {
    sizeCode: string;
    colorCode: string;
    factoryBarcode?: string;
    internalSKU: string;
    costPrice: number;
    sellingPrice: number;
    isActive: string;
}

export interface FormData {
    productName: string;
    brandId: string;
    categoryId: string;
    description: string;
    isActive: boolean;
    id: string;
    variants: ProductVariantForm[];
}
