<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-fanhui text-blue pt-2 pr-2"></div>
      <strong class="flex-1 fs-lg text-blue">{{model.title}}</strong>
      <div class="text-grey fs-xs">2019-01-01</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont icon-Menu"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link class="py-2" :to="`/articles/${item._id}`" tag="div" v-for="item in model.related" :key="item._id">{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {required: true,}
  },
  data(){
    return {
      model: null
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  watch: {
    id: 'fetch'
  },
}
</script>

<style lang="scss">
  .page-article {
    .body {
      
    }
  }
</style>

