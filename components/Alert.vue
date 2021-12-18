<template>
  <div
    class="flex justify-between text-white shadow-inner rounded p-3"
    :class="[alertTypeClass]"
  >
    <p class="self-center">
      <strong><span class="capitalize">{{ alertType }}: </span> </strong>{{ message }}
    </p>
    <strong class="text-xl align-center cursor-pointer alert-del"
      >&times;</strong
    >
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message', 'alertType'],
  data() {
    return {
      type: this.alertType
    }
  },
  computed: {
    alertTypeClass: function() {
      if (this.alertType == 'success') {
        return 'bg-green-400';
      } else if (this.alertType == 'warning') {
        return 'bg-orange-400';
      } else if(this.alertType == 'error') {
        return 'bg-red-400';
      }
    }
  }
}
</script>