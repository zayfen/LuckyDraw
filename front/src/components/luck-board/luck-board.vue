<template>
  <div class="luck-board">
    <div class="luck-board-title">
      <span>抽奖会话列表</span>
    </div>

    <div class="luck-board-sessions">
      <el-table 
        class="luck-board-table"
        :data="sessionsData"
        empty-text="还没有创建抽奖会话"
      >
        <el-table-column 
          v-for="(session, index) in sessionsSchema" 
          :key="index"
          :label="session.label"
          :prop="session.prop"
          :formatter="session.formatter"
        />
      </el-table>
    </div>

    <el-button 
      v-if="showCreateButton"
      type="primary"
      size="small"
      style="position: absolute; top: 0;right: 30px;margin-top: 20px;"
      @click="toggleLuckSessionForm"
    >
      添加新的抽奖
    </el-button>

    <el-dialog 
      title="创建新的抽奖"
      :modal-append-to-body="false"
      :visible.sync="formVisible"
    >
      <el-form 
        class="form-new-session"
        :model="sessionForm"
        ref="formRef"
      >
        <el-form-item label="奖品描述">
          <el-input v-model="sessionForm.desc" />
        </el-form-item>
        <el-form-item label="奖品数量">
          <el-input v-model.number="sessionForm.count" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-time-picker 
            style="width: 100%"
            v-model="sessionForm.startTime"
            type="datetime"
            value-format="timestamp"
          />
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary"
            @click="addNewLuckSession"
          >
          创建
          </el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Api from '../../api'

export default {
  name: 'LuckBoard',
  props: {
    showCreateButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      luckyPeople: [],
      sessionsData: [
      ],
      sessionsSchema: [
        { label: '奖品描述', prop: 'prizes', },
        { label: '奖品数量', prop: 'count', },
        { 
          label: '抽奖时间', 
          prop: 'startTime',
          formatter: (row, col, val) => {
            let dd = new Date(val)
            return [dd.getFullYear(), dd.getMonth()+1, dd.getDate()].join('/') + '  ' + [dd.getHours(), dd.getMinutes(), dd.getSeconds()].join(':')
          }
        },
        { 
          label: '中奖人员', 
          formatter: (row, col, val) => {
            let luckId = row.luckId
            let lp = this.luckyPeople.find(lp => lp.luckId === luckId)
            return lp ? lp.users.join(',') : '-'
          }
        },
        { 
          label: '抽奖会话状态', 
          prop: 'startTime', 
          formatter: (row, col, val) => {
            let finished = row.finished
            if (finished) {
              return '已结束'
            }
            return val === this.currentLuckSession.startTime ? '进行中' : '未开始'
          }
        }
      ],

      formVisible: false,
      sessionForm: {
        desc: '',
        count: '',
        startTime: ''
      },
      session: this.$route.query.session
    }
  },

  computed: {
    currentLuckSession () {
      const sessions = this.sessionsData.filter(s => !s.finished)
      sessions.sort((a, b) => a.startTime - b.startTime)
      return sessions[0]
    }
  },

  created () {
    if (!this.session) {
      this.$message.error('URL中请指定session')
    } else {
      this.requestLuckSessions()
    }
  },

  methods: {
    // 打开创建抽奖会话的form表单
    toggleLuckSessionForm () {
      this.formVisible = !this.formVisible
    },

    requestLuckSessions () {
      Api.fetchLuckSessions(this.session).then(res => {
        if (res.code === 0) {
          this.sessionsData = res.data.luckSessions
          this.luckyPeople = res.data.luckyPeople
          this.emitCurrentLuckSession()
        }

        // 每2秒拉一次数据
        setTimeout(this.requestLuckSessions.bind(this), 2000)
      }).catch(err => {
        // 每3秒拉一次数据
        setTimeout(this.requestLuckSessions.bind(this), 3000)
      })
    },

    // 添加新的抽奖
    addNewLuckSession () {
      if (!this.sessionForm.desc || !this.sessionForm.count || !this.sessionForm.startTime) {
        return this.$message.error('请填写合法的表单')
      }
      Api.commitNewLuckSession({
        session: this.session,
        prizes: this.sessionForm.desc,
        count: this.sessionForm.count,
        startTime: this.sessionForm.startTime

      }).then(res => {
        if (res.code === 0) {
          this.$message.success('创建成功')
          this.requestLuckSessions()
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },

    emitCurrentLuckSession () {
      this.$emit('change', this.currentLuckSession)
    },

    cancel () {
      this.$refs['formRef'].resetFields()
      this.formVisible = false
    }
  }
}
</script>


<style lang="less" scoped>
.luck-board {
  background: #fff;
  overflow-y: auto;
  padding: 30px;
  box-sizing: border-box;

  &-title {
    font-size: 26px;
    font-weight: 600;
    color: rgb(189,43,36);
  }
}
</style>
