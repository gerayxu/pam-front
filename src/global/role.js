import constants from "@/global/constants";

export const role = {
    data() {
        return {
            power: {
                ReadUser: false,
                WriteUser: false,
                ReadRole: false,
                WriteRole: false,
                ReadMeta: false,
                WriteMeta: false,
                ReadTask: false,
                WriteTask: false,
                ReadLine: false,
                WriteLine: false,
                ReadChain: false,
                WriteChain: false,
                ReadLog: false
            },
        }
    },
    methods: {
        packPower() {
            let power = 0
            Object.keys(this.power).forEach((key) => {
                if (this.power[key]) {
                    power |= 1 << constants.Power[key]
                }
            })
            return power
        },
        unpackPower(power) {
            Object.keys(this.power).forEach((key) => {
                if ((power & (1 << constants.Power[key])) > 0) {
                    this.power[key] = true
                }
            })
        }
    }
}