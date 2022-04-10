<template>
    <div>
      <v-card-title>DASHBOARD</v-card-title>
    </div>
</template>
<script>
export default {
    name: 'Dashboard',
    data(){
      return{
        loading: false,
        selection: 1,
      }
    },

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
}
</script>