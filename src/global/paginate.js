import {datePipe} from "@/global/utils";

export const paginate = {
    data() {
        return {
            loading: false,
            over: false,
            page: 1,
            total: 0,
            offset: 0,
            size: 10,
            result: [],
        }
    },
    methods: {
        paginate(obj) {
            obj.then(data => {
                if (!data.success) {
                    return
                }
                this.result = data.data
                if (this.result.length >= this.size) {
                    this.total = this.page * this.size + 1
                }
            }).catch(err => {
                console.log(err)
            })
            this.loading = false
        },
        sizeChange(val) {
            this.query.size = val
            this.getData()
        },
        prevChick() {
            this.page = this.page - 1
            this.query.offset = (this.page - 1) * this.query.size
            this.getData()
        },
        nextChick() {
            this.page = this.page + 1
            this.query.offset = (this.page - 1) * this.query.size
            this.getData()
        },
        getJump(url, value) {
            return url + value;
        },
        dateFormat(date) {
            return datePipe(date)
        }
    }
}