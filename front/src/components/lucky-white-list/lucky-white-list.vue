<template>
  <div class="lucky-white-list">
    <el-card shadow="always">
      <h5 style="padding: 0; margin: 0; color: #BD2B24;font-size:26px;">
        签到表({{tableData.filter(item => list.includes(item.name.trim())).length}}/{{ tableData.filter(item => item.name.trim()).length }})
      </h5>
      <el-table 
        class="lucky-white-list__table"
        :data="tableData"
        :row-class-name="tableRowClassName"
        empty-text="签到表为空"
        style="width: 100%">
        <el-table-column prop="name" label="姓名" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.editable" autofucus="true" v-model="scope.row.name" placeholder="请输入姓名" />
            <span v-else class="user-name" @dblclick="scope.row.editable = true">{{ scope.row.name }}</span>            
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <i color="green" v-if="list.includes(scope.row.name.trim())" class="el-icon-circle-check"></i>
            <i v-else class="el-icon-circle-close"></i>
            <span>{{ list.includes(scope.row.name.trim()) ? '已签到' : '未签到' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.$index, scope.row)">{{ scope.row.editable ? '确定' : '修改' }}</el-button>
            <el-button size="mini" type="weak" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button style="margin: 10px auto;"
        type="primary" 
        icon="el-icon-circle-plus-outline" 
        @click="addWhiteItem">添加</el-button>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable no-console */

import Api from '@/api'
export default {
  name: 'LuckyWhiteList',
  props: {
    session: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  data () {
    return {
      tableData: [],
    }
  },

  watch: {
    'tableData': function (newVal, oldVal) {
      this.notifyWhiteListChange()
    }
  },

  created () {
    this.loadCheckinList()
  },

  methods: {
    tableRowClassName ({ row }) {
      if (this.list.includes(row.name.trim())) {
        return 'checkin-status__yes'
      } else {
        return 'checkin-status__no'
      }
    },

    addWhiteItem () {
      this.tableData.push({
        name: '',
        editable: true
      })
    },

    notifyWhiteListChange () {
      this.$emit('changed', this.tableData)
    },

    edit (index, row) {
      row.editable = !row.editable
      if (!row.editable) {
        this.notifyWhiteListChange()
        this.saveCheckinList()
      }
    },

    deleteRow (index) {
      this.tableData.splice(index, 1)
      this.saveCheckinList()
    },

    saveCheckinList () {
      let whiteListNames = []
      this.tableData.forEach(item => whiteListNames.push(item.name))
      
      Api.upsertCheckinList(this.session, whiteListNames).then(response => {
        if (response.code === 0) {
          this.$message({ message: '签到表更新成功', type: 'success' })
        } else {
          this.$message({ message: '签到表更新失败', type: 'error' })
        }
      })
    },

    loadCheckinList () {
      Api.checkinList(this.session).then(response => {
        if (response.code === 0) {
          let checkinList = response.data
          checkinList.forEach(name => this.tableData.push({ name: name, editable: false }) )
        } else {
          console.error('Api.checkinList error: ', response.message)
        }
      }).catch(err => {
        console.error('Api.checkinList error: ', err)
        this.$message({ message: '签到表拉取失败', type: 'error' })
      })
    }


  }
}
</script>


<style lang="less" scoped>
  .lucky-white-list {
    transition: transform .5s ease-in;
    transition-delay: 0;
    transform: translateY(-100%);
    width: 80%;
    height: 90%;
    margin: 0 auto;
    overflow: auto;
    text-align: center;
    will-change: transform;
  }
</style>


<style lang="less">
  @mainColor: #BD2B24;
  @negitiveColor: #42D4DB;
  .lucky-white-list {
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
