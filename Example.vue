<template>
  <div class="example">
    <div class="toolbar">
      <a-icon title="复制代码" type="copy" theme="filled" @click="copySource" />
      <a-icon
        title="查看代码"
        type="code"
        theme="filled"
        @click="toggleCodeContainer"
      />
    </div>
    <div v-if="component" class="component-container">
      <component :is="component" />
    </div>
    <code-transition>
      <div v-if="showCode" class="code-container code-transition">
        <slot />
      </div>
    </code-transition>
  </div>
</template>
<script>
import CodeTransition from './CodeTransition.vue'

export default {
  components: { CodeTransition },
  props: {
    component: String,
    /**
     * 源代码
     */
    rawSource: String,
  },
  data () {
    return {
      showCode: false,
    }
  },
  methods: {
    copySource () {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.value = decodeURIComponent(this.rawSource)
      input.select()
      document.execCommand('Copy')
      input.remove()

      this.$message.success('复制成功')
    },
    toggleCodeContainer () {
      this.showCode = !this.showCode
    },
  }
}
</script>
<style lang="less">
.example {
  margin-top: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;

  > div + div {
    border-top: 1px solid;
    border-color: inherit;
  }

  .toolbar {
    padding: 15px;
    text-align: right;
    .anticon {
      margin-left: 5px;
      cursor: pointer;
    }
  }

  .component-container {
    padding: 15px;
  }

  .code-container {
    .language-vue {
      margin: 15px;
    }
  }
}
</style>