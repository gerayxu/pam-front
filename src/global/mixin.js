import {datePipe} from "@/global/utils";

export const mixin = {
    data() {
        return {
            pams: [
                {
                    "pamId": "",
                    "lineId": 0,
                    "lineCode": "",
                    "lineBatchCode": "",
                    "chainId": 0,
                    "chainCode": "",
                    "chainBatchCode": "",
                    "productCode": "",
                    "productName": "",
                    "supplyCount": 0,
                    "produceTime": "",
                    "supplyTime": ""
                }
            ],
            result: null,
            loading: true,
        }
    },
    methods: {
        getJump(url, value) {
            return url + value;
        },
        handler(obj) {
            obj.then(data => {
                if (!data.success) {
                    return
                }
                this.result = data.data
            }).catch(err => {
                console.log(err)
            })
            this.loading = false
        },
        dateFormat(date) {
            return datePipe(date)
        }
    }
}