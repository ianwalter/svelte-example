<style>
  nav {
    font-size: 1.25rem;
    line-height: 2rem;
  }
</style>

<script>
  import { router, go } from '@ianwalter/history-router'

  let view
  router.add('/', async () => {
    const { default: Home } = await import('@/components/Home')
    view = Home
  })
  router.add('/news', async () => {
    const { default: News } = await import('@/components/News')
    view = News
  })
  router.add('/about', async () => {
    const { default: About } = await import('@/components/About')
    view = About
  })
  router.go()
</script>

<nav>
  <ul>
    <li>
      <a href="/" on:click={go}>
        Home
      </a>
    </li>
    <li>
      <a href="/news" on:click={go}>
        News
      </a>
    </li>
    <li>
      <a href="/about" on:click={go}>About</a>
    </li>
  </ul>
</nav>

<main>
  <svelte:component this={view} />
</main>
