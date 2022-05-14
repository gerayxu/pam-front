<template>
  <el-dialog title="编辑权限" :visible.sync="innerVisible" width="640px">
    <el-form :gutter="20" class="add-user-form" label-width="100px">
      <el-form-item class="add-user-form-input" label="role name">
        <el-input v-model="form.roleName" placeholder="role name" disabled/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="role">
        <el-card shadow="none" class="add-power-form-checkbox">
          <el-row>
            <el-col :span="12">
              <el-checkbox style="float: left" v-model="power.ReadUser">ReadUser</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.WriteUser">WriteUser</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.ReadRole">ReadRole</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.WriteRole">WriteRole</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.ReadMeta">ReadMeta</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.WriteMeta">WriteMeta</el-checkbox><br/>
            </el-col>
            <el-col :span="12">
              <el-checkbox style="float: left" v-model="power.ReadTask">ReadTask</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.WriteTask">WriteTask</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.ReadLine">ReadLine</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.WriteLine">WriteLine</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.ReadChain">ReadChain</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.WriteChain">WriteChain</el-checkbox><br/>
              <el-checkbox style="float: left" v-model="power.ReadLog">ReadLog</el-checkbox><br/>
            </el-col>
          </el-row>
        </el-card>
      </el-form-item>
      <el-form-item class="add-user-form-input">
        <el-button style="float: right" type="primary" @click="submit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {window} from "@/global/window";
import {role} from "@/global/role";
import {editRole} from "@/api";
import {mixin} from "@/global/mixin";

export default {
  mixins: [window, role, mixin],
  props: {
    role: {
      type: Object,
    }
  },
  data() {
    return {
      form: {
        power: -1,
        roleName: "",
      }
    }
  },
  methods: {
    submit() {
      this.form.power = this.packPower()
      editRole(this.form).then(data => {
        if (data.success) {
          this.$message.success("edit role success")
          this.$router.go(0)
        }
      })
    },
  },
  watch: {
    role(newValue, oldValue) {
      if (!this.visible || newValue === oldValue) {
        return
      }
      this.form.roleName = this.role.roleName
      this.form.power = this.role.power
      this.unpackPower(this.role.power)
    }
  }
}
</script>

<style>
.add-user-form-input {
  margin-bottom: 20px;
  margin-right: 20px;
}
.add-power-form-checkbox {
  height: 300px;
}
</style>