<template>
  <div class="article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
      <div class="flex-1 text-blue pl-2">{{model.title}}</div>
      <div class="text-grey">2019-01-01</div>
    </div>
    <div class="p-3 body fs-lg" v-html="model.body"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-news"></i>
        <strong class="text-blue">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link
          class="py-1"
          :to="`/articles/${item._id}`"
          tag="div"
          v-for="item in model.related"
          :key="item._id"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { require: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id: "fetch"
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  }
};
</script>
<style lang="scss">
.article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
