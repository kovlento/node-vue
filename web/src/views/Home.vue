<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper2.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper3.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination text-right pagination-home px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons text-center pt-3 text-grey bg-white mt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="(item, index) in icoItems" :key="index">
          <i :class="setClass(item.class)"></i>
          <div class="fs-xs">{{ item.text }}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <!-- <m-card icon="cc-menu-circle" title="新闻资讯">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-2">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>王者荣耀祝各位召唤师春节快乐！</span>
              <span>06/07</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>-->
    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`articles/${news._id}`"
          class="py-2 d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-ellipsis">{{ news.title }}</span>
          <span class="text-grey">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link
            tag="div"
            :to="`heroes/${hero._id}`"
            class="p-2 text-center"
            style="width:20%;"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" alt class="w-100" />
            <div class="fs-xs">{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <m-card icon="cc-menu-circle" title="新闻资讯"></m-card>
    <m-card icon="cc-menu-circle" title="新闻资讯"></m-card>
    <m-card icon="cc-menu-circle" title="新闻资讯"></m-card>
    <m-card icon="cc-menu-circle" title="新闻资讯"></m-card>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: {
          delay: 3000
        },
        loop: true
      },
      icoItems: [
        {
          class: "1",
          text: "爆料站"
        },
        {
          class: "2",
          text: "故事会"
        },
        {
          class: "3",
          text: "周边商城"
        },
        {
          class: "4",
          text: "体验服"
        },
        {
          class: "5",
          text: "新人专区"
        },
        {
          class: "6",
          text: "荣耀·传承"
        },
        {
          class: "7",
          text: "模拟战资料库"
        },
        {
          class: "8",
          text: "王者营地"
        },
        {
          class: "9",
          text: "公众号"
        }
      ],
      newsCats: [],
      heroCats: []
    };
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
    setClass(value) {
      let obj = { face: true };
      obj["sprite " + `sprite-${value}`] = true;
      return obj;
    }
  }
};
</script>
<style lang="scss">
@import "../assets/scss/_variables";
.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info") !important;
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
    .sprite {
      height: 1.9231rem;
    }
  }
}
</style>
