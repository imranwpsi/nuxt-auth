<template>
  <div>
    <div class="bg-gray-200 min-h-screen pb-24">
      <Navbar />
      <div class="container mx-auto max-w-3xl mt-5">
        <h1 class="text-2xl font-bold text-gray-700 px-6 md:px-0">Profile</h1>
        <Alert :message="message" v-if="alertType" :alertType="alertType" class="my-4"/>
        <form ref="profileform" @submit.prevent="updateProfile()">
          <!-- @csrf -->
          <div class="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
            <div class="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
              <h2 class="font-medium text-md text-gray-700 mb-4 tracking-wide">Profile Info</h2>
              <p class="text-xs text-gray-500">Update your basic profile information such as Email Address, Name, and Image.</p>
            </div>
            <div class="md:w-2/3 w-full">
              <div class="py-8 px-16">
                <label for="first_name" class="text-sm text-gray-600">First Name</label>
                <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" id="first_name" type="text" v-model="tmpUser.first_name" name="first_name">
              </div>
              <div class="py-8 px-16">
                <label for="last_name" class="text-sm text-gray-600">Last Name</label>
                <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" id="last_name" type="text" v-model="tmpUser.last_name" name="last_name">
              </div>
              <hr class="border-gray-200">
              <div class="py-8 px-16">
                <label for="email" class="text-sm text-gray-600">Email Address</label>
                <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" id="email" type="email" v-model="tmpUser.email" name="email">
              </div>
              <div class="py-8 px-16">
                <label for="phone" class="text-sm text-gray-600">Phone</label>
                <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" id="phone" type="text" v-model="tmpUser.phone" name="phone">
              </div>
              <hr class="border-gray-200">
              <div class="py-8 px-16 clearfix">
                <label for="photo" class="text-sm text-gray-600 w-full block">Photo</label>
                <img class="rounded-full w-16 h-16 border-4 mt-2 border-gray-200 float-left" id="photo" src="https://pbs.twimg.com/profile_images/1163965029063913472/ItoFLWys_400x400.jpg" alt="photo">
                <div class="bg-gray-200 text-gray-500 text-xs mt-5 ml-3 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
                  <input type="file" name="photo" onchange="loadFile(event)" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"> Change Photo
                </div>
              </div>

            </div>

          </div>
          <div class="p-16 py-8 bg-gray-300 clearfix rounded-b-lg border-t border-gray-200">
            <p class="float-left text-xs text-gray-500 tracking-tight mt-2">Click on Save to update your Profile Info</p>
            <input type="submit" class="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer" value="Save">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '~/components/Navbar';

export default {
  name: 'profile',
  middleware: 'auth',
  components: {
    Navbar
  },
  data() {
    return {
      message: null,
      alertType: null,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    tmpUser: function() {
      return {
        first_name: this.loggedInUser.first_name,
        last_name: this.loggedInUser.last_name,
        email: this.loggedInUser.email,
        phone: this.loggedInUser.phone
      }
    }
  },
  methods: {
    async updateProfile() {
      this.error = {};
      try {
        // Prepare form data
        const formData = new FormData(this.$refs.profileform);
        formData.append('id', this.loggedInUser.id);
        formData.append('_method', 'put');

        console.log(formData);

        let res = await this.$axios.post('/api/v1/user/update', formData);

        console.log(res, 'res---------------');
        if (res) {
          if (res.data.success === false) {
            this.message = res.data.message;
            this.alertType = 'warning';
          } else {
            this.message = res.data.message;
            this.alertType = 'success';
          }
        }
      } catch (err) {
        this.error = err;
        // do something with error
      }
    },
  },
}
</script>