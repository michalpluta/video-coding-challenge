<template src="./VideoPlayer.html"></template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'VideoPlayer',
  data () {
    return {
      newItem: '',
      incorrectNewItem: false,
      itemId: '',
      playerVars: {
        autoplay: 1
      }
    }
  },

  computed: {
    ...mapState({
      listItems: state => state.listItems,
      currentListItem: state => state.currentListItem
    }),

    ...mapGetters([
      'getNextItem',
      'getCurrentItem'
    ])
  },

  created () {
    setTimeout(() => { this.playNextItem() }, 1000)
  },

  methods: {
    ...mapMutations([
      'addNewItem', 
      'deleteListItem', 
      'setCurrentItem'
    ]),

    playItem (video) {
      this.itemId = this.$youtube.getIdFromUrl(video)
      this.$refs.youtube.player.playVideo()
      this.setCurrentItem(video)
    },

    playNextItem () {
      let nextVideo = this.getNextItem
      this.itemId = this.$youtube.getIdFromUrl(nextVideo)
      this.$refs.youtube.player.playVideo()
      this.setCurrentItem(nextVideo)
    },

    deleteItem (video) {
      this.deleteListItem(video)
    },

    clearItemInput () {
      this.newItem = null
    },

    addItem () {
      let val = this.$youtube.getIdFromUrl(this.newItem)
      if (!val) this.incorrectNewItem = true
      else {
        this.incorrectNewItem = false
        this.addNewItem(this.newItem)
        this.clearItemInput()
      }
    },

    isActiveItem (item) {
      return this.getCurrentItem === item
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped src="./VideoPlayer.scss"></style>
