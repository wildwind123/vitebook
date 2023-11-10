<template>
  <div style="min-height: 100%">
    <nav class="bulma-navbar bulma-has-shadow">
      <div class="bulma-container">
        <div class="bulma-navbar-start">
          <a class="bulma-navbar-item"> ViteBook </a>
        </div>
      </div>
    </nav>

    <section class="bulma-main-content bulma-columns bulma-is-fullheight">
      <aside
        class="bulma-column bulma-is-2 bulma-is-narrow-mobile bulma-is-fullheight bulma-section bulma-is-hidden-mobile"
      >
        <p class="bulma-menu-label bulma-is-hidden-touch">Stories</p>
        <ul class="bulma-menu-list">
          <template v-for="story in bookStories">
            <li >
              <a
              :class="{['bulma-is-active']: story.storyId == selectedStoryIdComputed}"
                @click.prevent="selectedStoryIdComputed = story.storyId"
                :href="getStoryUrl(story.storyId)"
              >
                <span class="bulma-icon"><i class="fa fa-book"></i></span>
                {{ getFileName(story.file) }}
              </a>
            </li>
          </template>
        </ul>
      </aside>
  
      <div   class="bulma-container bulma-column iframe-container" style="height: 100%;" >
        <div class="iframe-container__wrapper">
             <iframe id="iframe" height="100%" width="100%" src=""></iframe>
        </div>
      

     
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import "#/style/bulma.css";

type Story = {
  storyId: string;
  file: string;
};

const selectedStoryId = ref('')

const selectedStoryIdComputed = computed({
  // getter
  get() {
    selectedStoryId.value = localStorage.getItem("selected_story_id") ?? "";
    return selectedStoryId.value;
  },
  // setter
  set(newValue) {
    selectedStoryId.value = newValue
    localStorage.setItem("selected_story_id", newValue);
    renderIframe(newValue);
  },
});

const bookStories = ref<Story[]>([
  {
    file: "11",
    storyId: "1111",
  },
  {
    file: "222",
    storyId: "asdf222a",
  },
]);

onMounted(() => {
  setBookStories();
  if (selectedStoryIdComputed.value != "" && selectedStoryIdComputed.value != null) {
    renderIframe(selectedStoryIdComputed.value);
  }
});

const setBookStories = () => {
  const base64 = document.getElementById("json")?.textContent;
  if (base64 == "") {
    return;
  }
  try {
    const parsedJson = atob(base64 ?? "");
    const json = JSON.parse(atob(base64 ?? ""));
    if (!parsedJson) {
      return;
    }
    bookStories.value = json.book;
  } catch (e) {
    console.log("empty story");
  }
};

const getFileName = (path: string) => {
  const res = /([^\\|/]+)$/.exec(path);
  if (!res) {
    return "unknown";
  }
  return res[1];
};

const renderIframe = (storyKey: string) => {
  (document.getElementById("iframe") as HTMLIFrameElement).src =
    getStoryUrl(storyKey);
};

const getStoryUrl = (storyKey: string) => {
  return document.location.origin.replace("book", `story.${storyKey}`);
};
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
.iframe-container{
  padding: 20px;
  height: 100%;
}
.iframe-container__wrapper{
  border: 2px solid;
  width: 80%;
  height: calc(100vh - 100px);
  resize: both;
  overflow: auto;
}

</style>
