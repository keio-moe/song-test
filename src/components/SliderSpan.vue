<template lang="pug">
.slider-span(:style="{display: 'flex'}")
  span(:style="{width: '200px'}")
    | {{ left }}
  span(:style="{flex: 1, 'text-align': 'center'}")
    | {{ middle }}
  span(:style="{width: '200px', 'text-align': 'right'}")
    | {{ right }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, Emit } from 'vue-property-decorator';
import consts from '@/consts';

@Component({
  name: 'SliderSpan',
})
export default class BalancedSlider extends Vue {
  @Prop(String) private left!: string;
  @Prop(String) private middle!: string;
  @Prop(String) private right!: string;
}
</script>
