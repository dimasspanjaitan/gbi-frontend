<template>
    <v-app id="inspire">
        <v-navigation-drawer
        v-model="drawer"
        app
        dark
        >
            <v-sheet
            class="pa-4"
            >
                <v-avatar
                color="grey darken-1"
                size="64"
                >
                    <v-img
                    aspect-ratio="30"
                    :src="require(`/public/logo.png`)"
                    alt="LOGO"
                    />
                </v-avatar>
                <span class="label"><strong>GBI PELITA</strong></span>
            </v-sheet>

            <v-divider></v-divider>

            <v-list>
                <template v-for="(item, i) in items">
                    <v-list-group
                    v-if="item.children"
                    v-model="item.model"
                    :key="item.name"
                    :prepend-icon="item.model ? item.icon : item['icon-alt']"
                    append-icon=""
                    >
                        <template v-slot:activator>
                            <v-list-item-title>{{ item.text }}</v-list-item-title>
                        </template>
                        
                        <v-list-item
                        v-for="child in item.children"
                        :key="child.name"
                        link
                        @click="openLink(child.url)"
                        >
                            <v-list-group
                            v-if="child.children"
                            >

                            </v-list-group>
                            <v-list-item
                            v-else
                            >
                                <v-list-item-icon>
                                    <v-icon small   >{{ child.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ child.text }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item>
                    </v-list-group>

                    <v-list-item v-else link :to="item.url" :key="i">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
        app
        flat
        outlined
        dense
        >
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title></v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>

        <v-footer 
        padless
        elevation="0"
        outlined
        >
            <v-col
            class="text-right"
            cols="12"
            lg
            >
                <span style="font-size: 12px; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
                    Power by <a href="http://www.bataxdev.com" target="_blank" rel="noopener noreferrer">BataxDev   </a>
                </span>
                <!-- {{ new Date().getFullYear() }} — <strong>Vuetify</strong> -->
            </v-col>
        </v-footer>
    </v-app>
</template>
<script>
export default {
    name: 'AdminLayout',
    data(){
        return{
            drawer: null,
            items: [
                {
                    "name": "dashboard",
                    "icon": "mdi-view-dashboard-outline",
                    "icon-alt": "mdi-view-dashboard",
                    "text": "Beranda",
                    "role": [],
                    "url": "/admin/dashboard",
                },
                {
                    "name": "master",
                    "icon": "mdi-database-cog-outline",
                    "icon-alt": "mdi-database-cog",
                    "text": "Master Data",
                    "role": [],
                    "model": false,
                    "children": [
                        {
                            "name": "post",
                            "icon": "mdi-note-outline",
                            "text": "Post",
                            "role": [],
                            "url": "/admin/post"
                        },
                        {
                            "name": "musing",
                            "icon": "mdi-book-open-variant",
                            "text": "Renungan Harian",
                            "role": [],
                            "url": "/admin/musing"
                        },
                        {
                            "name": "event",
                            "icon": "mdi-calendar-text-outline",
                            "text": "Event",
                            "role": [],
                            "url": "/admin/event"
                        },
                        {
                            "name": "icare",
                            "icon": "mdi-human-queue",
                            "text": "I Care",
                            "role": [],
                            "url": "/admin/icare"
                        },
                    ],
                },
                {
                    "name": "report",
                    "icon": "mdi-chart-line-stacked",
                    "icon-alt": "mdi-chart-line",
                    "text": "Laporan",
                    "role": [],
                    "model": false,
                    "children": [
                        {
                            "name": "congregation",
                            "icon": "mdi-account-multiple-plus-outline",
                            "text": "Pendaftaran Jemaat",
                            "role": [],
                            "url": "/admin/congregation"
                        },
                        {
                            "name": "dedication",
                            "icon": "mdi-account-child-outline",
                            "text": "Penyerahan Anak",
                            "role": [],
                            "url": "/admin/dedication"
                        },
                        {
                            "name": "baptism",
                            "icon": "mdi-account-heart-outline",
                            "text": "Baptisan Air",
                            "role": [],
                            "url": "/admin/baptism"
                        },
                        {
                            "name": "wedding",
                            "icon": "mdi-human-male-female",
                            "text": "Pemberkatan Nikah",
                            "role": [],
                            "url": "/admin/wedding"
                        },
                    ],
                },
                {
                    "name": "setting",
                    "icon": "mdi-cog-outline",
                    "icon-alt": "mdi-cog",
                    "text": "Pengaturan",
                    "role": [],
                    "model": false,
                    "children": [
                        {
                            "name": "user",
                            "icon": "mdi-account-key-outline",
                            "text": "Pengguna",
                            "role": [],
                            "url": "/admin/user"
                        },
                        {
                            "name": "category",
                            "icon": "mdi-shape-outline",
                            "text": "Kategori",
                            "role": [],
                            "url": "/admin/category"
                        },
                    ],
                },
            ],
        }
    },
    methods: {
        openLink(link){
          if(link !== '/logout') {
            if(link !== this.$route.path) {
              this.$router.push(link);
            }
          } else {
            // this.logOut()
          }
        },
    }
}
</script>

<style scoped>
    .label {
        margin-left: 20px;
        font-size: 20px;
    }
</style>