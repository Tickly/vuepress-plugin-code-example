<script>
const transitionClassName = 'code-transition'

export default {
  render (h) {
    return h('transition', {
      on: {
        /**
         * 进入中
         * @param {HTMLElement} el
         */
        beforeEnter (el) {
          el.classList.add(transitionClassName)
          el.style.height = '0'
        },
        /**
         * @param {HTMLElement} el
         */
        enter (el) {
          if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px'
          } else {
            el.style.height = ''
          }
        },
        /**
         * @param {HTMLElement} el
         */
        afterEnter (el) {
          el.classList.remove(transitionClassName)
          el.style.height = ''
        },
        /**
         * @param {HTMLElement} el
         */
        beforeLeave (el) {
          el.style.height = el.scrollHeight + 'px'
        },
        /**
         * @param {HTMLElement} el
         */
        leave (el) {
          if (el.scrollHeight !== 0) {
            el.classList.add(transitionClassName)
            el.style.transitionProperty = 'height'
            el.style.height = 0
          }
        },
        /**
         * @param {HTMLElement} el
         */
        afterLeave (el) {
          el.classList.remove(transitionClassName)
          el.style.height = ''
        },
      }
    }, this.$slots.default)
  }
}
</script>
<style lang="less">
.code-transition {
  transition-timing-function: ease-in-out;
  transition-duration: 0.5s;
  overflow: hidden;
}
</style>