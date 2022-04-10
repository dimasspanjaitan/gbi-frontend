<template>
    <div>
        DASHBOARD
    </div>
</template>
<script>
export default {
    name: 'Dashboard',
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
}
</script>