
export const pop = {
    data() {
        return {
            open: false,
            open_edit: false,
            select: {}
        }
    },
    methods: {
        opening() {
            this.open = true
        },
        closing() {
            this.open = false
        },
        openingEdit(data) {
            this.select = Object.assign({}, data)
            this.open_edit = true
        },
        closingEdit() {
            this.select = {}
            this.open_edit = false
        },
    }
}