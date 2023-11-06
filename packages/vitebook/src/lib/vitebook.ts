import { Plugin, normalizePath } from "vite";
import fs from "fs";
import path from "path";
import md5 from "crypto-js/md5";
import hmacSHA512 from "crypto-js/hmac-sha512";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

type Template = {
  fullPath: string;
  replace: string;
};

type StoryType = {
  storyId: string;
  file: string;
};

type Cfg = {
  htmlTemplatePath: Template;
  scriptTemplatePath: Template;
};

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

  if (cfg != undefined) {
    if (cfg.htmlTemplatePath != undefined) {
      params.htmlTemplatePath = cfg.htmlTemplatePath;
    }
    if (cfg.scriptTemplatePath != undefined) {
      params.scriptTemplatePath = cfg.scriptTemplatePath;
    }
  }

  const addStory = (story: Story) => {
    const res = md5(hmacSHA512(story.fullPath, "")).toString();

    const storyRelativePath = story.fullPath.replace(params.root, "");
    story.storyRelativePath = storyRelativePath;

    const fullPath = normalizePath(
      path.join(params.root, params.storiesCache, story.storyRelativePath)
    );
    story.storyFullPath = fullPath;
    params.book[res] = story;

    if (fs.existsSync(story.storyFullPath)) {
      return;
    }

    fs.mkdirSync(story.storyFullPath, { recursive: true });
    fs.writeFileSync(
      path.join(story.storyFullPath, "index.html"),
      story.getHtml()
    );
    fs.writeFileSync(
      path.join(story.storyFullPath, "script.ts"),
      story.getScript()
    );
  };

  const processBookStories = () => {
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
    const res = md5(hmacSHA512(story.fullPath, "")).toString();
    if (!params.book[res]) {
      return;
    }
    deleteDirectory(params.book[res].storyFullPath);
    delete params.book[res];
  };
  const isBookFile = (filePath: string) => {
    const fileName = filePath.split("/").pop() as string;
    return params.bookRegex.test(fileName);
  };

  return {
    name: "vite-plugin-vue-example",
    // enforce: "pre",
    // resolveId(source, importer, options) {
    //     console.log('resolveId', source, importer, options)
    //     return source
    // },
    config(_config, env) {
      params.command = env.command;
    },
    configResolved(config) {
      if (params.command != "serve") {
        return;
      }
      params.root = config.root;
      processBookStories();
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

      server.middlewares.use((req, _res, next) => {
        const host = req.headers.host ?? "";

        const isFirstWordStory = /^story\./.test(host);
        const isFirstWordBook = /^book\./.test(host);

        let md5Str = "";
        const md5Match = host.match(/^story\.([a-f0-9]{32})/);
        if (md5Match) {
          md5Str = md5Match[1];
        }

        server.transformIndexHtml = (
          _url,
          html,
          _originalUri
        ): Promise<string> => {
          return new Promise((resolve) => {
            if (isFirstWordStory && md5Str != "") {
              resolve(params.book[md5Str].getHtml());
            } else if (isFirstWordBook) {
              const items: StoryType[] = [];
              const keys = Object.keys(params.book);
              for (let i = 0; i < keys.length; i++) {
                const story: StoryType = {
                  storyId: md5(
                    hmacSHA512(params.book[keys[i]].fullPath, "")
                  ).toString(),
                  file: params.book[keys[i]].storyRelativePath,
                };
                items.push(story);
              }
              const obj = {
                book: items,
              };

              html = fs.readFileSync(
                path.join(__dirname, "../client/index.html"),
                "utf-8"
              );
              html = html.replace("--json-base64--", btoa(JSON.stringify(obj)));
              html = html.replace(
                "<!-- script -->",
                '<script type="module" src="/@vite/client"></script>'
              );
              resolve(
                html.replace("--json-base64--", btoa(JSON.stringify(obj)))
              );
            } else {
              resolve(html);
            }
          });
        };
        next();
      });
    },
  };
}

const fileList = function (dir: string) {
  const result = [];

  const files = [dir];
  do {
    const filepath = files.pop() as string;
    const stat = fs.lstatSync(filepath);
    if (stat.isDirectory()) {
      fs.readdirSync(filepath).forEach((f) =>
        files.push(path.join(filepath, f))
      );
    } else if (stat.isFile()) {
      result.push(path.normalize(filepath));
    }
  } while (files.length !== 0);

  return result;
};

class Story {
  public storyFullPath = "";
  public storyRelativePath = "";
  public fullPath: string = "";
  public htmlTemplatePath: Template = {
    fullPath: "",
    replace: "",
  };
  public scriptTemplatePath: Template = {
    fullPath: "",
    replace: "",
  };

  constructor(params: {
    fullPath: string;
    htmlTemplatePath: Template;
    scriptTemplatePath: Template;
  }) {
    this.fullPath = params.fullPath;
    this.htmlTemplatePath = params.htmlTemplatePath;
    this.scriptTemplatePath = params.scriptTemplatePath;
  }

  public getHtml() {
    var data = fs.readFileSync(this.htmlTemplatePath.fullPath, "utf-8");
    return data.replace(
      this.htmlTemplatePath.replace,
      path.join(this.storyFullPath, "script.ts")
    );
  }

  public getScript() {
    var data = fs.readFileSync(this.scriptTemplatePath.fullPath, "utf-8");
    return data.replace(this.scriptTemplatePath.replace, this.fullPath);
  }
}

const deleteDirectory = (directoryPath: string) => {
  try {
    if (fs.existsSync(directoryPath)) {
      // Get a list of files and subdirectories in the directory
      const files = fs.readdirSync(directoryPath);

      // Iterate through each file and subdirectory
      for (const file of files) {
        const filePath = path.join(directoryPath, file);

        // Check if it's a file or a subdirectory
        const isFile = fs.statSync(filePath).isFile();
        const isDirectory = fs.statSync(filePath).isDirectory();

        // If it's a file, delete it
        if (isFile) {
          fs.unlinkSync(filePath);
        }

        // If it's a subdirectory, recursively delete it
        if (isDirectory) {
          deleteDirectory(filePath);
        }
      }

      // Finally, remove the empty directory
      fs.rmdirSync(directoryPath);
    }
  } catch (e) {
    console.debug("cant delete path ", directoryPath, e);
  }
};
