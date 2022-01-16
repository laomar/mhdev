<template>
  <el-container class="h-screen">
    <el-header class="bg-gray-700"></el-header>
    <el-container class="h-full">
      <el-aside :width="isCollapse?'64px':'200px'" class="bg-gray-800 border-0">
        <el-menu
          default-active="2"
          background-color="black"
          text-color="white"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          style="border: 0;"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="bg-gray-200"></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  setup() {
    return {
      isCollapse: false
    };
  },
  methods: {
  }
};
</script>
