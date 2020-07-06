<template>
  <notifications
    group="main"
    :width="380"
    animation-name="v-fade-up"
    position="top center"
  >
    <template slot="body" slot-scope="props">
      <div
        class="custom-template"
        v-bind:style="getStyle('custom-template', props.item.type)"
      >
        <div
          class="custom-template-icon"
          v-bind:style="getStyle('custom-template-icon', props.item.type)"
        >
          <i class="material-icons">message</i>
        </div>
        <div class="custom-template-content">
          <div class="custom-template-title">
            {{ props.item.title }}
          </div>
          <div class="custom-template-text" v-html="props.item.text"></div>
        </div>
        <div class="custom-template-close" @click="props.close">
          <i class="material-icons">close</i>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {
  data: () => ({
    overrideStyles: {
      'custom-template': {
        success: {
          background: '#68cd86',
          border: '2px solid #42a85f'
        },
        warn: {
          background: '#ffb648',
          border: '2px solid #f48a06'
        },
        error: {
          background: '#e54d42',
          border: '2px solid #b82e24'
        }
      },
      'custom-template-icon': {
        success: {
          color: '#42a85f'
        },
        warn: {
          color: '#f48a06'
        },
        error: {
          color: '#b82e24'
        }
      }
    }
  }),
  methods: {
    getStyle(name, style) {
      if (name in this.overrideStyles && style in this.overrideStyles[name]) {
        return this.overrideStyles[name][style];
      }
      return {};
    }
  }
};
</script>

<style lang="scss">
.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  font-size: 13px;
  margin: 5px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  &,
  & > div {
    box-sizing: border-box;
  }
  .custom-template-icon {
    flex: 0 1 auto;
    font-size: 32px;
    padding: 0 10px;
  }
  .custom-template-close {
    flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;
    color: white;
    .custom-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
    }
  }
}
.v-fade-up-enter-active,
.v-fade-up-leave-active,
.v-fade-up-move {
  transition: all 0.5s;
}
.v-fade-up-enter,
.v-fade-up-leave-to {
  opacity: 0;
  transform: translateY(-80px) scale(0.2);
}
</style>
