<template>
    <nuxt />
</template>

<script>
export default {
  name: 'master-layout',
  middleware:['capturePackage','captureToken']
}
</script>