<script lang="ts">
  export let flyin: boolean;
  export let flyout: boolean;
  export let isCloud: boolean;
  export let onClose: () => void;

  import Icon from '$lib/components/icon/index.svelte';
  import { clickOutside } from '$lib/components/outside-click';
</script>

<div
  class={`text-gray-900 bg-white h-full z-10 border-gray-200 p-5 border-r-2 transition-width w-[300px] right-[300px] md:w-[500px] md:right-[500px] overflow-auto absolute`}
  class:flyin
  class:flyout
  use:clickOutside
  on:click-outside={onClose}
>
  <div class="relative">
    <div class="absolute right-0 top-0 cursor-pointer" on:click={onClose}>
      <Icon {isCloud} name="close" color="black" />
    </div>
  </div>
  <slot />
</div>

<style lang="postcss">
  @keyframes flyin {
    0% {
      right: 0;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    100% {
      right: -500px;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    }
  }
  @keyframes flyout {
    0% {
      right: -500px;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    }
    100% {
      right: 0;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
  }

  @keyframes flyinSmall {
    0% {
      right: 0;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    100% {
      right: -300px;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    }
  }
  @keyframes flyoutSmall {
    0% {
      right: -300px;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    }
    100% {
      right: 0;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
  }

  .flyin {
    animation-name: flyin;
    animation-duration: 0.6s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
  .flyout {
    animation-name: flyout;
    animation-duration: 0.6s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  @media (max-width: 640px) {
    .flyin {
      animation-name: flyinSmall;
      animation-duration: 0.6s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
    }
    .flyout {
      animation-name: flyoutSmall;
      animation-duration: 0.6s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
    }
  }

  .transition-width {
    transition: width 0.25s linear, max-width 0.25s linear;
  }
</style>
