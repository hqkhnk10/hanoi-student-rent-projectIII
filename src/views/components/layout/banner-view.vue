<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const input2 = ref('')
const bannerImage = ref([
  {
    src: 'https://s3-cdn.rever.vn/p/v2.46.17/images/cover_banner_style_a@2x.jpg'
  },
  {
    src: 'https://s3-cdn.rever.vn/p/v2.46.17/images/cover_banner_style_c@2x.jpg'
  }
])
const { push } = useRouter();
const findHouse = () => {
  push(`/houses?${input2.value}`)
}
</script>
<template>
  <div class="block text-center" m="t-4">
    <div class="banner__wrapper">
      <div class="banner__content">
        <div class="banner-content-inner">
          <h1 class="heading-01">Lựa chọn căn nhà ưng ý của bạn</h1>
          <el-input
            v-model="input2"
            class="w-50 m-2"
            size="large"
            placeholder="Tìm kiếm nhà"
            :prefix-icon="Search"
            @keydown.enter="findHouse"
          />
        </div>
      </div>
      <el-carousel trigger="click" height="100%" :interval="10000" class="banner__carousel">
        <el-carousel-item v-for="item in bannerImage" :key="item">
          <el-image :src="item.src" fit="fill" class="banner__carousel--image"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<style scoped>
.banner__content {
  display: flex;
  z-index: 1;
  position: relative;
  width: 50%;
  margin: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.banner__wrapper {
  position: relative;
  background-color: red;
  width: 100%;
  height: 500px;
}

.banner__carousel {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
}

.banner__carousel--image {
  width: 100%;
  height: 100%;
}

.banner-content-inner .heading-01 {
  margin-bottom: 16px;
  font-family: rv-font2, Arial, Helvetica, sans-serif;
  font-size: 45px;
  line-height: 60px;
  color: #fff;
}
</style>
