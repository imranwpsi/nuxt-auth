<template>
  <div class="flex h-screen items-center justify-center">
    <form ref="registerform" @submit.prevent="register()" class="w-1/4 mx-auto p-4">
      <h1 class="font-semibold mb-2 text-xl">
        Registration
      </h1>
      <div class="mb-4">
        <label for="first_name" class="block mb-1 text-sm">First Name</label>
        <input
          type="text"
          name="first_name"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <div class="mb-4">
        <label for="last_name" class="block mb-1 text-sm">Last Name</label>
        <input
          type="text"
          name="last_name"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block mb-1 text-sm">Email</label>
        <input
          type="email"
          name="email"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <div class="mb-4">
        <label for="phone" class="block mb-1 text-sm">Phone</label>
        <input
          type="text"
          name="phone"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-1 text-sm">Password</label>
        <input
          type="password"
          name="password"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-1 text-sm">Status</label>
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white font-semibold py-2 px-10 w-full rounded"
      >
        Register
      </button>
      <p class="mt-5 text-center">Already got an account? <nuxt-link class="text-blue-500" to="/login">Login</nuxt-link></p>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: {},
      };
    },
    methods: {
      async register() {
        this.error = {};
        try {
          // Prepare form data
          const formData = new FormData(this.$refs.registerform);

          console.log(formData);

          let res = await this.$axios.post('/api/v1/auth/register', formData);

          console.log(res, 'res---------------');
          if (res) {
            if (res.data.success) {
              // Redirect user after login
              this.$router.push({
                path: '/profile',
              });
            } else {
              this.error = res.data.message;
            }
          }

          // Redirect user after register
          this.$router.push({
            path: '/login',
          });
        } catch (err) {
          this.error = err;
          // do something with error
        }
      },
    },
  };
</script>