
export const window = {
    model: {
        prop: 'visible',  // 修改 v-model 绑定的props名称
        event: 'toggle'  // 修改 v-model 绑定的自定义事件名
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        innerVisible: {
            get: function() {
                return this.visible
            },
            set: function(val) {
                this.$emit('update:toggle', val)
            }
        }
    },
}