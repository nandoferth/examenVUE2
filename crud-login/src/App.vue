<template>
  <v-app>
    <v-main>
      <toolbar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar';

export default {
  name: 'App',

  

  data: () => ({
    //
  }),
  components:
    {'toolbar': Toolbar}
  ,
};
</script>
