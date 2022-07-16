<template>
  <module></module>
</template>

<script>
import module from '@/components/MkdView'
import { highLightButton } from '@/js/util'

export default {
  components: {
    module
  },
  mounted() {
    highLightButton(1)
  }
}
</script>

<style scoped>
</style>
