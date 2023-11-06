<template>
  <div style="min-height: 100%">
    <nav class="bulma-navbar bulma-has-shadow">
      <div class="bulma-container">
        <div class="bulma-navbar-start">
          <a class="bulma-navbar-item"> Website </a>
        </div>
        <label for="menu-toggle" class="bulma-navbar-toggle">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <input type="checkbox" id="menu-toggle" class="bulma-is-hidden" />
        <div class="bulma-navbar-right bulma-navbar-menu">
          <a class="bulma-navbar-item bulma-is-tab bulma-is-hidden-tablet">
            <span class="bulma-icon"><i class="fa fa-home"></i></span>
            Home
          </a>
          <a class="bulma-navbar-item bulma-is-tab bulma-is-hidden-tablet">
            <span class="bulma-icon"><i class="fa fa-table"></i></span>
            Links
          </a>
          <a class="bulma-navbar-item bulma-is-tab bulma-is-hidden-tablet">
            <span class="bulma-icon"><i class="fa fa-info"></i></span>
            About
          </a>

          <a class="bulma-navbar-item bulma-is-tab bulma-is-active">
            <span class="bulma-icon"><i class="fa fa-user"></i></span>
          </a>
          <a class="bulma-navbar-item bulma-is-tab">
            <span class="bulma-icon"><i class="fa fa-sign-out"></i></span>
          </a>
        </div>
      </div>
    </nav>

    <section class="bulma-main-content bulma-columns bulma-is-fullheight">
      <aside
        class="bulma-column bulma-is-2 bulma-is-narrow-mobile bulma-is-fullheight bulma-section bulma-is-hidden-mobile"
      >
        <p class="bulma-menu-label bulma-is-hidden-touch">Navigation</p>
        <ul class="bulma-menu-list">
          <template v-for="story in bookStories">
            <li>
              <a @click.prevent="renderIframe(story.storyId)" :href="getStoryUrl(story.storyId)">
                <span class="bulma-icon"><i class="fa fa-home"></i></span>
                {{ getFileName(story.file) }}
              </a>
            </li>
          </template>
        </ul>
      </aside>

      <div class="bulma-container bulma-column" style="display: flex;">
        <iframe id="iframe" height="3300px" width="400px" src=""></iframe>
      </div>
    </section>

  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import "#/style/bulma.css"

type Story =  {
    storyId: string;
    file: string;
  };

const bookStories = ref<Story[]>([

]);

onMounted(() => {
  setBookStories()
})

const setBookStories = () => {
  const base64 = document.getElementById('json')?.textContent
  if (base64 == '') {
    return
  }
  try {
    const parsedJson = atob(base64 ?? '')
    const json = JSON.parse(atob(base64 ?? ''))
    if (!parsedJson) {
      return
    }
  bookStories.value = json.book

  } catch(e) {
    console.log('empty story')
  }
 
}

const getFileName = (path: string) => {
  const res = /([^\\|/]+)$/.exec(path);
  if (!res) {
    return "unknown";
  }
  return res[1];
};

const renderIframe = (storyKey : string) => {
  (document.getElementById('iframe') as HTMLIFrameElement).src =  getStoryUrl(storyKey)
}

const getStoryUrl = (storyKey: string) => {
  return document.location.origin.replace('book', `story.${storyKey}`)
}

</script>
<style>
html,
body,
#app {
  height: 100%;
}
#app {
  min-height: 100%;
}
.footer {
  margin-top: -12px;
}
</style>
