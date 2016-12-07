<template>
  <div id="app">
    <div>
      <router-view></router-view>
    </div>
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
