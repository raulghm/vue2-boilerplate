<template>
  <div id="app" :class="[routeClass]">
    <h1>Hello Vue 2</h1>

    <ul>
      <li><router-link to="/">Go to home</router-link></li>
      <li><router-link to="/demo">Go to demo</router-link></li>
    </ul>

    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'app',
    store: [],
    data() {
      return {}
    },
    created() {},
    methods: {},
    events: {},
    computed: {
      /**
       * Get a class name based on the route path.
       *
       * @return {String}
       */
       routeClass() {
        return this.$route.path.split('/').filter(part => Boolean(part)).join('-')
      }
    },
    components: {},
  }
</script>
