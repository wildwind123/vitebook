import { getRelativePath } from "./helper";
import { Template } from "./types";
import fs from "fs";

export class Story {
    public storyId = "";
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
  
    public getHtml(rootPath : string) {
      try {
        var data = fs.readFileSync(this.htmlTemplatePath.fullPath, "utf-8");
        

        return data.replace(
          this.htmlTemplatePath.replace,
          `${getRelativePath(this.scriptTemplatePath.fullPath , rootPath)}?story_html_script_id=${this.storyId}`
        ) ?? `<div>something went wrong. This ${this.htmlTemplatePath.fullPath} file exist ?</div>`;
      } catch (e) {
        return `<div>cant get ${this.htmlTemplatePath.fullPath}. file exist ?</div>`
      }
      
    }
  
    public getScript(rootPath : string) {
      var data = fs.readFileSync(this.scriptTemplatePath.fullPath, "utf-8");
      return data.replace(this.scriptTemplatePath.replace, getRelativePath(this.fullPath, rootPath));
    }

    public getScriptUseCode(code: string, rootPath : string) {
      
      return code.replace(this.scriptTemplatePath.replace, getRelativePath(this.fullPath, rootPath));
    }
  }