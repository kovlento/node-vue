<template>
  <div>
    <h1>文章列表</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="_id"
        label="ID"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章名称"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="remove(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      model: {},
      tableData: []
    };
  },
  computed: {},
  created() {
    this.fetch();
  },
  mounted() {},
  watch: {},
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.tableData = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除文章"${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`rest/articles/${row._id}`);
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
</style>
