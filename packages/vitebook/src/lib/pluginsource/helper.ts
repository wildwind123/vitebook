import fs from "fs";
import path from "path";
import md5 from "crypto-js/md5";
import hmacSHA512 from "crypto-js/hmac-sha512";
import { StoryId } from "./types";
import { Story } from "./story";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

export const fileList = function (dir: string) {
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

export const handleHost = (host: string) => {
    
    const isFirstWordStory = /^story\./.test(host);
    const isFirstWordBook = /^book\./.test(host);
    let storyId = ""
    if (isFirstWordStory) {
       const match = host.match(/^story\.([a-f0-9]{32})/)
        if (match && match.length ) {
            storyId = match[1];
        }
    }

    return {
        storyId: storyId,
        isBook: isFirstWordBook
    }
}

export const generateStoryId = (fileFullPath: string) => {
    return md5(
        hmacSHA512(fileFullPath, "")
      ).toString()
}

export const getStoryId = (book : Record<string, Story> ) : StoryId[] => {
    const items: StoryId[] = [];
    const keys = Object.keys(book);
    for (let i = 0; i < keys.length; i++) {
      const story: StoryId = {
        storyId: generateStoryId(book[keys[i]].fullPath),
        file: book[keys[i]].storyRelativePath,
      };
      items.push(story);
    }
    return items
}

export const generateBookHtml= (book : Record<string, Story>) : string => {
  
    const obj = {
        book: getStoryId(book),
      };
   let html = fs.readFileSync(
        path.join(__dirname, "../client/index.html"),
        "utf-8"
      );
      html = html.replace("--json-base64--", btoa(JSON.stringify(obj)));
      html = html.replace(
        "<!-- script -->",
        '<script type="module" src="/@vite/client"></script>'
      );
      return html.replace("--json-base64--", btoa(JSON.stringify(obj)))
}