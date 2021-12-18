<template>
  <div class="flex h-screen items-center justify-center">
    <form ref="loginform" @submit.prevent="login()" class="w-1/4 mx-auto p-4">
      <h1 class="font-semibold mb-2 text-xl">
        Login
      </h1>
      <Alert :message="message" v-if="alertType" :alertType="alertType" class="my-4"/>
      <div class="my-4">
        <label for="username" class="block mb-1 text-sm">Phone/Email</label>
        <input
          type="text"
          name="username"
          class="w-full border rounded px-3 py-2"
          value="+8801750042986"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-1 text-sm">Password</label>
        <input
          type="password"
          name="password"
          class="w-full border rounded px-3 py-2"
          value="123456"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white font-semibold py-2 px-10 w-full rounded"
      >
        Login
      </button>
      <p class="mt-5 text-center">Don't have an account? <nuxt-link class="text-blue-500" to="/register">Register</nuxt-link></p>
    </form>
  </div>
</template>

<script>
  import Alert from '~/components/Alert';

  export default {
    components: {
      Alert
    },
    data() {
      return {
        message: null,
        alertType: null,
      };
    },
    mounted() {
      // Before loading login page, obtain csrf cookie from the server.
      //this.$axios.$get('/sanctum/csrf-cookie');
    },
    methods: {
      async login() {
        this.message = null;
        this.alertType = null;
        try {
          // Prepare form data
          const formData = new FormData(this.$refs.loginform);

          console.log(formData);

          // Pass form data to `loginWith` function
          await this.$auth.loginWith('laravelSanctum', { data: formData });

          /*if (res) {
            if (res.data.success === false) {
              this.message = res.data.message;
              this.alertType = 'warning';
            }
          }*/

          this.$router.push({
            path: '/profile',
          });

        } catch (err) {
          this.message = 'Login failed. Try again';
          this.alertType = 'error';
          // do something with error
        }
      },
    },
  };
</script>