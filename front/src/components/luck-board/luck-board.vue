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
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="weak" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
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

    <el-button 
      v-if="showCreateButton"
      size="small"
      style="position: absolute; top: 0;right: 180px;margin-top: 20px;"
      @click="resetSession"
    >
      重置抽奖
    </el-button>

    <el-dialog 
      title="创建新的抽奖"
      :modal-append-to-body="false"
      :before-close="toggleLuckSessionForm"
      :visible.sync="formVisible"
    >
      <el-form 
        class="form-new-session"
        :model="sessionForm"
        ref="formRef"
      >
        <el-form-item label="奖品描述">
          <el-input v-model="sessionForm.prizes" />
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
            @click="upsertLuckSession"
          >
          {{ sessionForm.luckId ? '更新' : '创建' }}
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
        prizes: '',
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

    edit (index, row) {
      if (row.finished) {
        return this.$message.error("禁止修改已结束的抽奖")
      }

      this.toggleLuckSessionForm()
      this.sessionForm = row
      Api.upsertLuckSession(this.sessionForm).then(res => {
        if (res.code === 0) {
          this.$message.success('修改成功')
          this.requestLuckSessions()

        } else {
          this.$message.error(res.message || '修改失败')
        }

      }).catch(err => {
        this.$message.error(err || '修改失败')
      })
    },

    deleteRow (index, row) {
      if (row.finished) {
        return this.$message.error("禁止删除已结束的抽奖")
      }
      Api.deleteLuckSession(row.luckId).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.requestLuckSessions()
        } else {
          this.$message.error(res.message || '删除失败')
        }

      }).catch(err => {
        this.$message.error(err || '删除失败')
      })

    },

    // 打开创建抽奖会话的form表单
    toggleLuckSessionForm () {
      this.formVisible = !this.formVisible
      if (!this.formVisible) { // 关闭，则清空sessionForm
        this.sessionForm = {
          prizes: '',
          count: '',
          startTime: ''
        }
      }
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
    upsertLuckSession () {
      if (!this.sessionForm.prizes || !this.sessionForm.count || !this.sessionForm.startTime) {
        return this.$message.error('请填写合法的表单')
      }
      Api.upsertLuckSession({
        session: this.session,
        prizes: this.sessionForm.prizes,
        count: this.sessionForm.count,
        startTime: this.sessionForm.startTime,
        luckId: this.sessionForm.luckId
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(this.sessionForm.luckId ? '修改成功' : '创建成功')
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
      this.toggleLuckSessionForm()
    },

    resetSession () {
      this.$prompt('请输入TOKEN', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        Api.resetSession({ session: this.session, token: value }).then(res => {
          if (res.code === 0) {
            let key = this.session + '-lucky-names'
            localStorage.removeItem(key)
            this.requestLuckSessions()
            this.$message.success('已重置抽奖')

          } else {
            this.$message.error(res.message || '重置失败')
          }
        })
      }).catch(() => {
        this.$message.error("重置失败")
      })
    }
  }
}
</script>


<style lang="less" scoped>
.luck-board {
  transition: transform .3s ease-in-out;
  transition-delay: 0;
  background: #fff;
  overflow-y: auto;
  will-change: transform;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;

  &-title {
    font-size: 26px;
    font-weight: 600;
    color: rgb(189,43,36);
  }
}
</style>


<style lang="less">
  @mainColor: #BD2B24;
  @negitiveColor: #42D4DB;
  .luck-board {
    color: @mainColor;

    .el-button--primary {
      background-color: @mainColor;
      border-color: @mainColor;
    }

    .el-button--weak {
      &:hover {
        color: @mainColor;
        background-color: #fff;
        border-color: @mainColor;
      }
    }

    .el-table .cell {
      color: @mainColor;
    }

    .el-input__inner {
      height: 30px;
      line-height: 30px;
      border-color: @mainColor;
      color: @mainColor;
    }

    .el-table td {
      padding: 5px 0;
    }

    .el-table th.is-leaf {
      padding: 5px 0;
    }

    .user-name {
      display: inline-block;
      width: 100%;
      height: 30px;
      line-height: 30px;
    }

    .checkin-status__no {
    }

    .checkin-status__yes {
      background-color: rgba(66,212,219,.2);
    }
  }
 
</style>
