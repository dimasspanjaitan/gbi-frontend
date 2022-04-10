<template>
    <v-app id="inspire">
        <v-app-bar
        app
        color="primary"
        dark
        >
            HOME BAR
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>
<script>
export default {
    name: 'PublicView',
}
</script>