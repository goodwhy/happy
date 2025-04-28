<template>
  <el-container class="main-container">
    <!-- 顶部 Header -->
    <el-header class="header">
      <div class="header-container">
        <!-- 左侧 Logo -->
        <div class="logo-container">
          <!-- <img
            src="@/assets/logo.png"
            alt="Logo"
            class="logo-image"
          > -->
          <span class="logo-text">GeoC147组</span>
        </div>

        <!-- 中间导航菜单 -->
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          class="nav-menu"
          background-color="#ffffff"
          text-color="#2c3e50"
          active-text-color="#42b983"
          router
        >
          <el-menu-item index="/map">
            <el-icon><House /></el-icon>
            地图显示
          </el-menu-item>
          <el-menu-item index="/advance1">
            <el-icon><Box /></el-icon>
            高级功能1
          </el-menu-item>
          <el-menu-item index="/advance2">
            <el-icon><MagicStick /></el-icon>
            高级功能2
          </el-menu-item>
          <el-menu-item index="/advance3">
            <el-icon><Location /></el-icon>
            高级功能3
          </el-menu-item>
        </el-menu>

        <!-- 右侧用户区 -->
        <div class="user-container">
          <el-dropdown trigger="click">
            <div class="user-wrapper">
              <el-avatar
                :size="36"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
              <span class="user-name">GeoUser</span>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon><User /></el-icon>个人中心
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon><Setting /></el-icon>账户设置
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <!-- 页面内容 -->
    <el-main class="main-content">
      <router-view />
    </el-main>

    <!-- 新增页脚 -->
    <el-footer class="footer">
      <div class="footer-content">
        <div class="copyright">© 2023 易智瑞开发组C14组</div>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  House,
  Box,
  MagicStick,
  Phone,
  User,
  Setting,
  SwitchButton,
  ArrowDown,
  Loading,
  Location,
} from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = ref(route.path)
</script>

<style scoped lang="scss">
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main-content {
    flex: 1;

    background-color: #f8fafc;
  }
}
.footer {
  background: white;
  color: rgba(8, 8, 8, 0.8);

  display: flex; /* 使用 Flexbox 布局 */
  align-items: center;
  justify-content: center;
  .footer-content {
    max-width: auto;
    margin: 0 auto;
  }
  .copyright {
    text-align: center;
    border-top: rgba(24, 22, 22, 0.1);
    color: rgba(14, 13, 13, 0.6);
    font-size: 14px;
  }
}

.header {
  --header-height: 60px;
  --logo-width: 180px;
  --user-width: 160px;

  height: var(--header-height);
  border-bottom: 1px solid #e6e6e6;
  background: #fff;

  .header-container {
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;

    // 左侧Logo样式
    .logo-container {
      display: flex;
      align-items: center;
      width: var(--logo-width);
      margin-right: 40px;

      .logo-image {
        width: 36px;
        height: 36px;
        margin-right: 12px;
      }

      .logo-text {
        font-size: 20px;
        font-weight: 600;
        color: #2c3e50;
        letter-spacing: 1px;
      }
    }

    // 导航菜单样式
    .nav-menu {
      flex: 1;
      border-bottom: none;

      :deep(.el-menu-item) {
        font-size: 16px;
        transition: all 0.3s;

        &:hover {
          background-color: #f5f7fa !important;
          transform: translateY(-2px);
        }

        &.is-active {
          border-bottom: 2px solid var(--el-color-primary);
        }

        .el-icon {
          margin-right: 6px;
          font-size: 18px;
        }
      }
    }

    // 右侧用户区样式
    .user-container {
      width: var(--user-width);
      margin-left: auto;

      .user-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          opacity: 0.8;
        }

        .user-name {
          margin: 0 8px;
          font-size: 14px;
          color: #2c3e50;
        }

        .el-icon {
          color: #666;
        }
      }
    }
  }
}

// 响应式适配
@media (max-width: 992px) {
  .header {
    .header-container {
      padding: 0 20px;

      .logo-container {
        margin-right: 20px;
        width: 140px;

        .logo-text {
          font-size: 18px;
        }
      }

      .nav-menu {
        :deep(.el-menu-item) {
          font-size: 14px;
          padding: 0 12px;

          .el-icon {
            display: none;
          }
        }
      }

      .user-container {
        .user-name {
          display: none;
        }
      }
    }
  }
}
</style>
