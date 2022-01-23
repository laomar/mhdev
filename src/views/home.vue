<style>
.menu-item {
  height:50px;
  line-height:50px;
  background-color: #2E6CF6;
}
.menu-item:hover {
  background-color: #2E6CF6;
}
</style>
<template>
  <el-container class="h-screen px-0 mx-0">
    <el-header height="50px" class="px-0 dark:bg-neutral-800 flex justify-between items-center">
      <el-image
        class="w-8 -ml-1 grayscale-0"
        :src="logo"
        :fit="fit"
      ></el-image>
      <div>
        <el-link class="ml-6" :href="www + '/help'" target="_blank" :underline="false"><span class="dark:text-white text-xs">{{$t('help')}}</span></el-link>
        <el-link class="ml-6" :href="www + '/doc'" target="_blank" :underline="false"><span class="dark:text-white text-xs">{{$t('doc')}}</span></el-link>
        <el-link class="ml-6" href="/workorder" :underline="false"><span class="dark:text-white text-xs">{{$t('workorder')}}</span></el-link>
        <el-dropdown @command="setLang" class="ml-6 px-0">
          <el-link :underline="false">
            <span class="dark:text-white text-xs">
              <template v-if="locale === 'zh'">中文</template>
              <template v-if="locale === 'en'">Englist</template>
            </span>
          </el-link>
          <el-icon><caret-bottom class="dark:text-white text-xs" /></el-icon>
          <template #dropdown>
            <el-dropdown-menu style="background-color: #171717;">
              <el-dropdown-item command="zh" class=" hover:bg-neutral-600">简体中文</el-dropdown-item>
              <el-dropdown-item command="en">Englist</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown @command="expense" class="ml-6">
          <el-link :underline="false"><span class="dark:text-white text-xs">{{$t('expense')}}</span></el-link>
          <el-icon><caret-bottom class="dark:text-white text-xs" /></el-icon>
          <template #dropdown>
            <el-dropdown-menu style="background-color: #171717;">
              <el-dropdown-item command="myorder">{{$t('myorder')}}</el-dropdown-item>
              <el-dropdown-item command="payments">{{$t('payments')}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown @command="dropdown" class="ml-6">
          <el-avatar class="align-middle" :size="24" src="https://thirdwx.qlogo.cn/mmopen/mOW261WJzibtvH7qo1Zcg2icAySsT7ZtDJUIKuAC3ibuu6xFzR6eNmZCoAzWcswve7hib9tQziaAE73tjEScsUicicliaw/132"></el-avatar>
          <el-icon><caret-bottom class="dark:text-white text-xs" /></el-icon>
          <template #dropdown>
            <el-dropdown-menu class="w-32" style="background-color: #171717;">
              <div class="text-center p-2">码海无涯</div>
              <el-dropdown-item divided disabled>
                <el-radio-group v-model="theme" size="small" @change="setTheme">
                  <el-radio-button label="dark">深色</el-radio-button>
                  <el-radio-button label="light">浅色</el-radio-button>
                </el-radio-group>
              </el-dropdown-item>
              <el-dropdown-item command="profile" :icon="Setting" divided>{{$t('profile')}}</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="Right">{{$t('logout')}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="h-full">
      <el-aside :width="isCollapse?'64px':'200px'" class="dark:bg-neutral-800 border-0 text-center">
        <el-menu
          default-active="index"
          active-text-color="#ffffff"
          :background-color="theme === 'dark'? '#262626':''"
          :text-color="theme === 'dark'? '#7E868D':''"
          :unique-opened="true"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          style="border: 0;"
        >
          <el-menu-item index="index" class="menu-item">
            <el-icon class="is-loading"><home-filled /></el-icon>
            <template #title>概况</template>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>产品</span>
            </template>
            <el-menu-item index="1-1">APP</el-menu-item>
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
      <el-main class="bg-gray-100 dark:bg-neutral-900" style="padding: 0;">
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
import { getCurrentInstance, ref } from 'vue';
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
    const theme = ref(localStorage.getItem('theme') || 'dark');
    if (theme.value === 'dark') document.documentElement.classList.add('dark');
    // 语言
    const { locale, t } = useI18n();
    document.title = t('sitetitle');
    function setLang(lang) {
      const curlang = locale.value;
      locale.value = lang;
      proxy.$cookies.set('lang', lang, '365d', '/', util.domain());
      if (curlang !== lang) window.location.reload();
    }

    // 主题
    function setTheme(tm) {
      if (tm === 'dark') document.documentElement.classList.add(tm);
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', tm);
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

    // 费用菜单
    function expense(cmd) {
      switch (cmd) {
      case 'myorder':
        proxy.$router.push('/expense/orders');
        break;
      case 'payments':
        proxy.$router.push('/expense/payments');
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
      setTheme,
      theme,
      dropdown,
      expense,
      isCollapse: true,
      www: import.meta.env.VITE_WWW
    };
  }
};
</script>
