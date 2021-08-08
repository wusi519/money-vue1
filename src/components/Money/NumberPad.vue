<template>
	<div class="numberPad">
		<div class="output">{{output}}</div>
		<div class="numberPadButtons">
			<button @click="inputContent">1</button>
			<button @click="inputContent">2</button>
			<button @click="inputContent">3</button>
			<button @click="deleteNumber">删除</button>
			<button @click="inputContent">4</button>
			<button @click="inputContent">5</button>
			<button @click="inputContent">6</button>
			<button @click="clearContent">清空</button>
			<button @click="inputContent">7</button>
			<button @click="inputContent">8</button>
			<button @click="inputContent">9</button>
			<button class="ok" @click="ok">OK</button>
			<button class="zero" @click="inputContent">0</button>
			<button @click="inputContent">.</button>
		</div>
	</div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    @Prop(Number) readonly value!: number;
    output = this.value.toString();

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if (this.output.length === 8) {return;}
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {
        return;
      }
      this.output += input;
    }

    deleteNumber() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }

    clearContent() {
      this.output = '0';
    }

    ok() {
      const number = parseFloat(this.output);
      this.$emit('update:value', number);
      this.$emit('submit', number);
      this.output = '0';
    }
  }
</script>

<style lang="scss" scoped>
	@import "~@/assets/style/Helper.scss";

	.numberPad {
		> .output {
			@extend %clearFix;
			font-size: 36px;
			font-family: Consolas, monospace;
			padding: 9px 16px;
			text-align: right;
			@extend %innerShadow;
		}

		> .numberPadButtons {
			@extend %clearFix;

			> button {
				border: 1px solid #ccc;
				width: 25%;
				height: 64px;
				float: left;
				font-size: 18px;
				border-bottom: 1px solid #cacaca;

				&:nth-child(13), &:nth-child(14),
				&:nth-child(12) {
					border-bottom: none;
				}

				&:nth-child(4), &:nth-child(8),
				&:nth-child(12) {
					border-right: none;
				}

				&.ok {
					height: 64*2px;
					float: right;
				}

				&.zero {
					width: 50%;
				}
			}
		}
	}

</style>













