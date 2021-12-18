<template>
  <div class="example" tabindex="0" @keydown.esc="toggleCodeContainer">
    <div class="toolbar">
      <a-tooltip title="复制代码">
        <a-icon type="copy" @click="copySource" />
      </a-tooltip>
      <a-tooltip title="查看代码，或者按ESC。">
        <a-icon type="code" @click="toggleCodeContainer" />
      </a-tooltip>
    </div>
    <div v-if="component" class="component-container">
      <component :is="component" />
    </div>
    <code-transition>
      <div v-if="showCode" class="code-container">
        <div class="p-15">
          <slot />
        </div>
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
  },
}
</script>
<style lang="less">
.example {
  margin-top: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:hover {
    box-shadow: 0 0 5px #ccc;
  }

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
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  // 组件示例
  .component-container {
    padding: 15px;
  }

  // 组件代码
  .code-container {
    position: relative;

    .p-15 {
      padding: 15px;
    }

    .language-vue {
      margin: 0;
    }

    .hide-code {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 10px;
      background-color: black;
    }
  }
}
</style>
