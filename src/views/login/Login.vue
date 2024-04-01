<template>
  <a-row
    justify="center"
    align="middle"
    class="flex-1 h-[100vh]"
  >
    <a-col :span="6">
      <a-row justify="center">
        <h1>统一门户系统</h1>
      </a-row>
      <a-form
        :model="store"
        autocomplete="off"
        @submit="onSubmit"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="store.username" />
        </a-form-item>
        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input v-model:value="store.password" />
        </a-form-item>
        <a-form-item
          name="remember"
        >
          <a-row
            justify="space-between"
            align="middle"
          >
            <a-checkbox 
              v-model:checked="store.remember" 
              @change="onchangeAutoLogin"
            >
              自动登录
            </a-checkbox>

            <a-button
              type="link"
            >
              忘记密码？
            </a-button>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-button
            block
            type="primary"
            html-type="submit"
          >
            登陆
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
// import router from '@src/router';
import { PORTAL_TOKEN_KEY } from '@src/utils'
import { CheckboxChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
interface FormState {
  username: string;
  password: string;
  remember: boolean;
} 
const store = reactive<FormState>({
  username: 'admin',
  password: 'admin123',
  remember: false
});

const onchangeAutoLogin = (e: CheckboxChangeEvent) => {
  if (e.target.checked) {
    localStorage.setItem('AUTO_LOGIN', '1');
  } else {
    localStorage.setItem('AUTO_LOGIN', '0');
  }
}

const onSubmit = async () => {
  const res = await $API.AUTH.login({
    account: store.username,
    password: store.password
  });
  if (res.success) {
    localStorage.setItem(PORTAL_TOKEN_KEY, res.data.token);
    router.push({path: '/app1/page1'})
  }
};
</script>