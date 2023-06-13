<template>
  <div class="demo-image__preview">
    <el-image
      style="width: 60%; height: 40%"
      :src="house.imageList[0]"
      :zoom-rate="1.2"
      :preview-src-list="house.imageList"
      :initial-index="0"
      fit="cover"
    />
  </div>
  <section class="page-listing-detail">
    <div class="width1140">
      <div class="left-content">
        <div class="content-detail-house">
          <div class="address">{{ house.address }}</div>
          <h1 style="font-size: larger; color: black; font-weight: 500">{{ house.description }}</h1>
          <ul class="detailroom detail-row">
            <li class="listing-detail-price">
              <div class="listing-detail-price-cost">
                <span title="Giá/m2" style="color: black; font-weight: 500">{{ formatMoney(house.price) }}</span>
              </div>
            </li>
            <li title="Phòng ngủ">
                <Icon icon="material-symbols:bedroom-parent-outline" />
                <span>
              {{ house.bedrooms }}
                </span>
            </li>
            <li title="Phòng khách">
            <Icon icon="material-symbols:family-restroom"></Icon>
            <span>
              {{ house.living_rooms }}
                </span>

            </li>
            <li title="Diện tích">
                <Icon icon="material-symbols:square-foot-sharp" />
                <span>
              {{ house.area }}m²
                </span>
            </li>
          </ul>
          <div>
            {{ formatPropertyStatus(house.status) }}
          </div>
        </div>
        <div class="heading-02">Tổng quan</div>
        <div class="content collapsed pdb-0" data-height="150">
          <p class="summary">
            {{ house.overview }}
          </p>
        </div>
        <div class="heading-02">Thông tin cơ bản</div>
        <div class="content">
          <ul class="detail-more">
            <li>
              <p class="left">Loại hình</p>
              <p class="right"><a href="/s/ho-chi-minh/mua/can-ho" target="_blank">Căn hộ</a></p>
            </li>
            <li>
              <p class="left">Phòng ngủ</p>
              <p class="right notranslate">
                <a href="/s/ho-chi-minh/mua/3-phong-ngu" target="_blank">{{ house.bedrooms }}</a>
              </p>
            </li>
            <li>
              <p class="left">Phòng khách</p>
              <p class="right notranslate">{{ house.living_rooms }}</p>
            </li>
            <li>
              <p class="left">Diện tích</p>
              <p class="right notranslate">{{ house.area }} m²</p>
            </li>
            <li>
              <p class="left">Tình hình nội thất</p>
              <p class="right">{{ house.amenities }}</p>
            </li>
            <li>
              <p class="left">Dự án</p>
              <p class="right">
                <a>{{ house.projectName }}</a>
              </p>
            </li>
            <li>
              <p class="left">Giá bán</p>
              <p class="right">{{ formatMoney(house.price) }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-content">
        <div class="sidebar-agent is-call">
          <p class="sidebar-agent-title">Chủ nhà</p>
          <div class="sidebar-agent-info">
            <div class="sidebar-agent-avatar">
              <img :src="house.userImage" alt="Ava" />

              <span class="agent-status online"></span>
            </div>
            <div>
              <p class="sidebar-agent-name">
                <a  class="font-bold">{{ house.userName }}</a>
              </p>
              <div>
                {{ house.phone }}
              </div>
            </div>
          </div>
          <div class="sidebar-agent-cta">
            <a
              onclick="clickRequestCallPopup()"
              style="opacity: 1; margin-bottom: 25px"
              class="btn-primary btn-large btn-red flex items-center justify-center cursor-pointer"
            >
              <strong>Liên hệ</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPropertyById } from '../../../../api/property'
import { formatMoney, formatPropertyStatus } from '../../../../js/format'

const route = useRoute()
const id = computed(() => route.params.id)
const house = ref({
  address: '',
  description: '',
  status: '',
  overview: '',
  amenities: '',
  area: '',
  bathroom: '',
  bedrooms: '',
  living_rooms: '',
  projectName: '',
  price: '',
  imageList: [],
  userName: '',
  userImage: '',
  phone: ''
})
onBeforeMount(() => {
  getPropertyById({ id: id.value }).then((res) => {
    house.value = res.data
    house.value.imageList = res.data.imageList.map((e)=>e.url)
  })
  
})
</script>

<style scoped>
.demo-image__preview {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.page-listing-detail {
  background: #fff;
  width: 100%;
  padding: 40px 0 60px 0;
}
.width1140 {
  display: flex;
  max-width: 1140px;
  margin: 0 auto;
  position: relative;
  clear: both;
}
.left-content {
  float: left;
  width: 65%;
  margin-right: 3%;
  font-size: 1rem;
  line-height: 24px;
  line-height: 26px;
}
.content-detail-house {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.page-listing-detail .right-content.visible-pc {
  position: sticky;
  top: 30px;
  max-width: 365px;
  width: 35%;
}
.content-detail-house .detail-house .address {
  font-size: 16px;
  color: #999;
}
.content-detail-house header.detail-house ul.detailroom li.listing-detail-price {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  border-left: none;
  padding-left: 0;
}
.content-detail-house header.detail-house ul.detailroom {
  color: #444c59;
  font-size: 1.7em;
  font-family: rv-font1, Arial, Helvetica, sans-serif;
  font-weight: 400;
}
.detail-row {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
}
.right-content {
  position: sticky;
  top: 30px;
  max-width: 365px;
  width: 35%;
  float: right;
}
.sidebar-agent-info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 24px;
}
.sidebar-agent-avatar {
  position: relative;
  min-width: 74px;
  width: 74px;
  height: 74px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 50%;
  background: -webkit-gradient(linear, left top, right top, from(#c72528), to(#ffa3fd));
  background: linear-gradient(to right, #c72528, #ffa3fd);
  margin-right: 16px;
  padding: 4px;
}
.sidebar-agent-avatar img {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: #fff;
  padding: 4px;
}
.sidebar-agent {
  position: static;
  top: 72px;
  width: 100%;
  padding: 24px 24px 0;
  -webkit-box-shadow: 0 2px 16px 0 rgba(170, 170, 170, 0.2);
  box-shadow: 0 2px 16px 0 rgba(170, 170, 170, 0.2);
  border: solid 1px rgba(204, 204, 204, 0.4);
}
.sidebar-agent .sidebar-agent-title,
.sidebar-agent h3 {
  margin-bottom: 24px;
  font-family: rv-font2;
  font-size: 24px;
  line-height: 1.5;
  font-weight: 500;
  color: #30333a;
}
.heading-02 {
  position: relative;
  padding: 40px 0 20px;
  font-size: 1.5rem;
  line-height: normal;
  font-family: rv-font2, Arial, Helvetica, sans-serif;
}
.detail-more {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  overflow: auto;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(48, 51, 58, 0.15);
}
.detail-more li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-bottom: 1px dotted #dedede;
  width: 100%;
  margin-right: 4%;
  padding: 7px 0;
  float: left;
}
.left {
  float: left !important;
}
.detail-more li .right {
  max-width: 100%;
  overflow: hidden;
  height: auto !important;
  text-align: right;
  float: right;
  padding: 0;
  color: #444c59;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
}
.right {
  float: right !important;
}
.detailroom.detail-row > li{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
}
</style>
