<template>
  <el-container class="h-screen px-0 mx-0">
    <el-header class="px-0 bg-gray-700 flex justify-between items-center">
      <el-image
        class="w-8 -ml-1 grayscale"
        :src="logo"
        :fit="fit"
      ></el-image>
      <div>
        <el-dropdown @command="setLang">
          <el-button type="text" style="color:white">{{locale}}</el-button>
          <el-icon class="ml-1" style="color:white"><caret-bottom /></el-icon>
          <template #dropdown>
            <el-dropdown-menu class="min-w-max">
              <el-dropdown-item command="zh">简体中文</el-dropdown-item>
              <el-dropdown-item command="en">Englist</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown @command="dropdown" class="ml-6">
          <el-avatar class="align-middle" :size="24" src="https://thirdwx.qlogo.cn/mmopen/mOW261WJzibtvH7qo1Zcg2icAySsT7ZtDJUIKuAC3ibuu6xFzR6eNmZCoAzWcswve7hib9tQziaAE73tjEScsUicicliaw/132"></el-avatar>
          <el-icon class="ml-1" style="color:white"><caret-bottom /></el-icon>
          <template #dropdown>
            <el-dropdown-menu class="min-w-max">
              <div class="text-center p-2">码海无涯</div>
              <el-dropdown-item command="profile" :icon="Setting" divided>{{$t('profile')}}</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="Right">{{$t('logout')}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="h-full">
      <el-aside :width="isCollapse?'64px':'200px'" class="bg-gray-800 border-0">
        <el-menu
          default-active="2"
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="white"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          style="border: 0;"
        >
          <el-menu-item index="2">
            <el-icon class="is-loading"><home-filled /></el-icon>
            <template #title>概况</template>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><top /></el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="bg-gray-200">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  CaretBottom, HomeFilled, Location, Top, Right, Setting
} from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import { getCurrentInstance } from 'vue';
import logo from '../assets/logo.png';
import util from '../util';

export default {
  components: {
    CaretBottom,
    HomeFilled,
    Location,
    Top
  },
  setup() {
    const { proxy } = getCurrentInstance();
    // 语言
    const { locale } = useI18n();
    function setLang(lang) {
      const curlang = locale.value;
      locale.value = lang;
      proxy.$cookies.set('lang', lang, '365d', '/', util.domain());
      if (curlang !== lang) window.location.reload();
    }

    // 退出登录
    function logout() {
      proxy.$cookies.remove('token', '/', util.domain());
      window.location.reload();
    }

    // 下拉菜单
    function dropdown(cmd) {
      switch (cmd) {
      case 'logout':
        logout();
        break;
      default:
      }
    }

    return {
      Setting,
      Right,
      logo,
      locale,
      setLang,
      dropdown,
      isCollapse: true
    };
  }
};
</script>
