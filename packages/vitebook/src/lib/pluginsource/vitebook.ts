import { Plugin, normalizePath } from "vite";
import path from "path";
import { parse } from "url";

import queryString from "query-string";
import { Story } from "./story";
import { Cfg, Template } from "./types";
import {
  fileList,
  generateBookHtml,
  generateStoryId,
  handleHost,
} from "./helper";

export default function vitebook(cfg: Cfg): Plugin {
  const params = {
    command: "build",
    host: "",
    root: "",
    book: {} as Record<string, Story>,
    bookRegex: /\.story\./,
    storiesPath: "src",
    storiesCache: ".stories_cache",
    viteStoryKey: "",
    scriptTemplatePath: {
      fullPath: "",
      replace: "",
    } as Template,
    htmlTemplatePath: {
      fullPath: "",
      replace: "",
    } as Template,
  };

  const addStory = (story: Story) => {
    const res = generateStoryId(story.fullPath);

    story.storyId = res;
    const storyRelativePath = story.fullPath.replace(params.root, "");
    story.storyRelativePath = storyRelativePath;

    const fullPath = normalizePath(
      path.join(params.root, params.storiesCache, story.storyRelativePath)
    );
    story.storyFullPath = fullPath;
    params.book[res] = story;
  };

  const fillBookStories = () => {
    const files = fileList(path.join(params.root, params.storiesPath));
    params.book = {};
    for (let i = 0; i < files.length; i++) {
      if (!isBookFile(files[i])) {
        continue;
      }

      addStory(
        new Story({
          fullPath: files[i],
          htmlTemplatePath: cfg.htmlTemplatePath,
          scriptTemplatePath: cfg.scriptTemplatePath,
        })
      );
    }
  };

  const removeStory = (story: Story) => {
    const res = generateStoryId(story.fullPath);
    if (!params.book[res]) {
      return;
    }
    // deleteDirectory(params.book[res].storyFullPath);
    delete params.book[res];
  };
  const isBookFile = (filePath: string) => {
    const fileName = filePath.split("/").pop() as string;
    return params.bookRegex.test(fileName);
  };

  return {
    name: "vite-plugin-vitebook",
    config(_config, env) {
      params.command = env.command;
    },
    configResolved(config) {
      if (params.command != "serve") {
        return;
      }
      params.root = config.root;
      fillBookStories();
    },
    configureServer(server) {
      server.watcher.on("add", (file) => {
        if (!isBookFile(file)) {
          return;
        }
        server.ws.send({
          type: "full-reload",
        });
        addStory(
          new Story({
            fullPath: file,
            htmlTemplatePath: cfg.htmlTemplatePath,
            scriptTemplatePath: cfg.scriptTemplatePath,
          })
        );
      });

      // event if story deleted
      server.watcher.on("unlink", (file) => {
        if (!isBookFile(file)) {
          return;
        }
        server.ws.send({
          type: "full-reload",
        });

        removeStory(
          new Story({
            fullPath: file,
            htmlTemplatePath: {
              fullPath: "",
              replace: "",
            },
            scriptTemplatePath: {
              fullPath: "",
              replace: "",
            },
          })
        );
      });
      // set host info to config, for transform html
      server.middlewares.use((req, _res, next) => {
        // @ts-ignore
        if (!server.config.___vitebook) {
          // @ts-ignore
          server.config.___vitebook = {};
        }
        // @ts-ignore
        server.config.___vitebook.host = req.headers.host;
        next();
        return;
      });
    },
    transformIndexHtml(html, ctx) {
      // @ts-ignore
      const host = ctx.server?.config.___vitebook.host;
      const { storyId, isBook } = handleHost(host);
      if (storyId == "" && !isBook) {
        return html;
      } else if (isBook) {
        return generateBookHtml(params.book);
      } else if (storyId != "") {
        if (!params.book[storyId]) {
          return `<div>story book id does not exist ${storyId}, try clear cache</div>`;
        }

        return params.book[storyId].getHtml(params.root);
      }

      return html;
    },
    transform(code, id, _options) {
      if (!id.includes("story_html_script_id")) {
        return {
          code: code,
        };
      }

      const parsedUrl = parse(id);
      if (!parsedUrl.query) {
        return {
          code: code,
        };
      }
      const queryParams = queryString.parse(parsedUrl.query);
      if (!queryParams.story_html_script_id) {
        return {
          code: code,
        };
      }
      if (!params.book[queryParams.story_html_script_id as string]) {
        return {
          code: code,
        };
      }
      return {
        code: params.book[
          queryParams.story_html_script_id as string
        ].getScriptUseCode(code, params.root),
      };
    },
  };
}
