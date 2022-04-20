<template>
  <v-card class="pa-5">
        <v-toolbar color="primary" flat dark>KATEGORI</v-toolbar>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                    <v-text-field
                        counter="40"
                        label="Nama"
                        required
                        :rules="nameRules"
                        v-model="form.name"
                    ></v-text-field>
                    <v-textarea
                        label="Deskripsi"
                        required
                        :rules="descriptionRules"
                        v-model="form.description"
                    ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
        <!-- <snack-bar :active="sb.active" :timeout="sb.timeout" :message="sb.message" :color="sb.color" /> -->
      </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
      dialog: {
          type: Boolean,
          default: () => false
      },
      data: {
        type: Object,
        default: () => null
      },
      mode: {
        type: Number,
        default: () => 0
      }
    },
    data(){
        return{
            nameRules: [
                value => !!value || 'Nama tidak boleh kosong',
                value => (value || '').length <= 40 || 'Maksimal 40 karakter',
            ],
            descriptionRules: [
                value => !!value || 'Deskripsi tidak boleh kosong',
            ],
            menu: false,
            modal: false,
        }
    },
    computed: {
        form :function(){
            if(!this.mode) return {}
            else return this.data
        }
    },
    methods: {
        ...mapActions({
            saveData: 'category/create',
            updateData: 'category/update',
        }),
        closeDialog(){
            this.$emit('close', false)
        },
        async save(){
            if(this.$refs.form.validate()){
                try{
                    if(!this.mode) {
                        /** INSERT */
                        this.saveData(this.form).then((resp) => {
                        if(resp.status){
                            this.form = {};
                            this.$emit('close', false);
                            this.$toast.success('Berhasil menyimpan data')
                        } else this.$toast.error('Gagal menyimpan data')
                        })
                    } else {
                        /** UPDATE */
                        await this.updateData(this.form).then((resp) => {
                        if(resp.status){
                            this.form = {}
                            this.$emit('close',false);
                            this.$toast.success('Berhasil mengubah data')
                        } else this.$toast.error('Gagal mengubah data')
                        })
                    }
                }catch(e){
                console.log(e)
                }
            }
        }
    },
}
</script>

<style>

</style>