<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="#C8E6C9"
      color="black"
      centered      
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Info
        <v-icon>mdi-wrench</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Nauta
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Otros
        <v-icon>mdi-pencil</v-icon>        
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card v-if="i===1" flat>
            <Info/>
        </v-card>


        <v-card v-if="i===2" flat>
          <Nauta/>
        </v-card>


        <v-card v-if="i===3" flat>
          <Otros/>
        </v-card>

      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Info from "./Info"
import Nauta from "./Nauta"
import Otros from "./Otros"

  export default {
    data () {
      return {
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    components:{
        Info,
        Nauta,
        Otros
    }
  }
</script>

<style lang="scss" scoped>

</style>