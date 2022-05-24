<script lang="ts">
  import Icon from '$lib/components/icon/index.svelte';

  export let feedbackUrl: string;
</script>

<a href={feedbackUrl} target="_blank" data-cy="give-feedback">
  <div class="feedback-button">
    <div class="feedback-icon">
      <Icon name="heart" color="#e9d5ff" scale={0.5} />
    </div>
    Give Feedback
  </div>
</a>

<style lang="postcss">
  .feedback-button {
    @apply rounded-full w-40 px-4 py-2 text-sm text-purple-200 flex items-center justify-between shadow-md cursor-pointer;
  }

  .feedback-button:hover {
    @apply bg-gray-700;
  }

  .feedback-icon {
    @apply rounded-full border-2 border-purple-200 mr-2;
  }
</style>
