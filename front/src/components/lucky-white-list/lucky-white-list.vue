<template>
  <div class="lucky-white-list">
    <el-card shadow="always">
      <el-table 
        class="lucky-white-list__table"
        :data="tableData"
        style="width: 100%">
        <el-table-column prp="name" label="姓名">
          <template slot-scope="scope">
            <el-input v-if="scope.row.editable" autofucus="true" v-model="scope.row.name" placeholder="请输入姓名" @blur="scope.row.editable = false" />
            <span v-else>{{ scope.row.name }}</span>            
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <i color="green" v-if="scope.row.status === 1" class="el-icon-circle-check"></i>
            <i v-else class="el-icon-circle-close"></i>
            <span>{{ {0: '未签到', 1: '已签到'}[scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.$index, scope.row)">{{ scope.row.editable ? '确定' : '修改' }}</el-button>
            <el-button @click="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addWhiteItem">添加</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LuckyWhiteList',
  props: {
    session: {
      type: String | Number,
      required: true
    }
  },

  data () {
    return {
      tableData: [],
    }
  },

  methods: {
    addWhiteItem () {
      this.tableData.push({
        name: '',
        status: 0,
        editable: true
      })
    },

    edit (index, row) {
      row.editable = !row.editable
    },

    deleteRow (index, row) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>


<style lang="less" scoped>
  .lucky-white-list {
    transition: transform 1s ease-in;
    transform: translateY(-103%);
    width: 80%;
    height: 90%;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
  }
</style>
