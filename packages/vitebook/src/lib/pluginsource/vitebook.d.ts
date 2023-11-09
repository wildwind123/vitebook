import { Plugin } from "vite";
declare type Template = {
    fullPath: string;
    replace: string;
};
declare type Cfg = {
    htmlTemplatePath: Template;
    scriptTemplatePath: Template;
};
export default function vitebook(cfg: Cfg): Plugin;
