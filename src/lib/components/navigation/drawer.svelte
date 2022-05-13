<script lang="ts">
  export let flyin: boolean;
  export let flyout: boolean;
</script>

<div
  class={`text-gray-900 bg-white h-full z-10 border-gray-200 p-5 border-r-2 transition-width w-[40vw] right-[40vw] overflow-auto absolute`}
  class:flyin
  class:flyout
>
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
      right: -40vw;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    }
  }
  @keyframes flyout {
    0% {
      right: -40vw;
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
  .transition-width {
    transition: width 0.25s linear, max-width 0.25s linear;
  }
</style>
