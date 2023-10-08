<script setup lang="ts">
import useAuthStore from "~/store/useAuthStroe";

const formData = useState("formData", () => ({
  email: "",
  password: "",
}));

const auth = useAuthStore();
</script>
<template>
  <div class="relative flex flex-col justify-center h-screen overflow-hidden bg-base-200" style="
      background-image: url(/images/login-bg.png);
      background-repeat: no-repeat;
      background-position: center;
    ">
    <div class="w-full px-8 py-12 m-auto bg-base-100 rounded-md shadow-xl text-base lg:max-w-lg">
      <div class="space-y-3">
        <Brand />
        <p class="text-center text-xl font-bold">Welcome Back</p>
        <p class="text-center">Enter you email and password to sign in</p>
      </div>

      <form class="space-y-4" action="" method="post" @submit.prevent="">
        <div>
          <label class="label">
            <span class="text-base label-text">Email</span>
          </label>
          <input type="text" placeholder="Email Address" class="w-full input input-bordered" name="email"
            v-model="formData.email" />
        </div>
        <div>
          <label class="label">
            <span class="text-base label-text">Password</span>
          </label>
          <input type="password" placeholder="Enter Password" class="w-full input input-bordered" name="password"
            v-model="formData.password" />
        </div>
        <div class="flex justify-between">
          <div class="form-control">
            <label class="label cursor-pointer gap-2">
              <input type="checkbox" class="toggle toggle-xs" name="rememberMe" />
              <span class="label-text">Remember me</span>
            </label>
          </div>
          <a href="" class="btn btn-link text-black no-underline normal-case btn-sm">Forget Password?</a>
        </div>
        <div>
          <button class="btn btn-primary w-full" @click="auth.adminLogin(formData.email, formData.password)">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
