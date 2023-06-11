<template>
  <body class="fix-header fix-sidebar card-no-border">
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <div id="main-wrapper">
      <!-- ============================================================== -->
      <!-- End Topbar header -->
      <!-- ============================================================== -->
      <!-- ============================================================== -->
      <!-- Left Sidebar - style you can find in sidebar.scss  -->
      <!-- ============================================================== -->
      <aside class="left-sidebar" style="padding-top: 0">
        <!-- Sidebar scroll-->
        <div class="scroll-sidebar">
          <!-- Sidebar navigation-->
          <nav class="sidebar-nav">
            <ul id="sidebarnav">
              <li @click="this.$router.push('/dashboard')">
                <a class="waves-effect waves-dark" aria-expanded="false" :class="{'isActive': path == '/dashboard'}"
                  ><i class="mdi mdi-gauge"></i><span class="hide-menu">Tổng quan</span></a
                >
              </li>
              <li @click="this.$router.push('/users')">
                <a class="waves-effect waves-dark" aria-expanded="false" :class="{'isActive': path == '/users'}"
                  ><i class="mdi mdi-account-check"></i><span class="hide-menu">Người dùng</span></a
                >
              </li>
              <li @click="this.$router.push('/approve')">
                <a class="waves-effect waves-dark" aria-expanded="false" :class="{'isActive': path == '/approve'}">
                  <el-icon><Check /></el-icon>
                  <span class="hide-menu">Duyệt</span>
                </a>
              </li>
              <li @click="this.$router.push('/property')">
                <a class="waves-effect waves-dark" aria-expanded="false" :class="{'isActive': path == '/property'}"
                  ><i class="mdi mdi-table"></i><span class="hide-menu">Bất động sản</span></a
                >
              </li>
              <li @click="this.$router.push('/project')">
                <a class="waves-effect waves-dark" aria-expanded="false" :class="{'isActive': path == '/project'}"
                  ><el-icon><HomeFilled /></el-icon><span class="hide-menu">Dự án</span></a
                >
              </li>
            </ul>
          </nav>
          <!-- End Sidebar navigation -->
        </div>
        <!-- End Sidebar scroll-->
      </aside>
      <!-- ============================================================== -->
      <!-- End Left Sidebar - style you can find in sidebar.scss  -->
      <!-- ============================================================== -->
      <!-- ============================================================== -->
      <!-- Page wrapper  -->
      <!-- ============================================================== -->
      <div class="page-wrapper">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </div>
      <!-- ============================================================== -->
      <!-- End Page wrapper  -->
      <!-- ============================================================== -->
    </div>
  </body>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const path = computed(() => route.path);
</script>
<style scoped>
.sidebar-nav ul li a.isActive, .sidebar-nav ul li a.isActive i {
    color: #ffffff;
}
</style>
