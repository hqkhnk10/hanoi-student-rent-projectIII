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
              <li>
                <a class="waves-effect waves-dark" aria-expanded="false"
                  ><i class="mdi mdi-gauge"></i><span class="hide-menu">Dashboard</span></a
                >
              </li>
              <li>
                <a class="waves-effect waves-dark" aria-expanded="false"
                  ><i class="mdi mdi-account-check"></i><span class="hide-menu">Users</span></a
                >
              </li>
              <li>
                <a class="waves-effect waves-dark" aria-expanded="false"
                  ><i class="mdi mdi-table"></i><span class="hide-menu">Properties</span></a
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
<style scoped></style>
