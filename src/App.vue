<template>
  <v-app>
    <Menu/>
    <Tabs/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Menu from './components/Menu';
import Tabs from './components/Tabs';

export default {
  name: 'App',

  components: {
    HelloWorld,
    Menu,
    Tabs
  },

  data: () => ({
    //
  }),
};
</script>
