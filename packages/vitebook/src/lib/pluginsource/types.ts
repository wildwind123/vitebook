export type Template = {
  fullPath: string;
  replace: string;
};

export type StoryId = {
  storyId: string;
  file: string;
};

export type Cfg = {
  htmlTemplatePath: Template;
  scriptTemplatePath: Template;
};

export type ViteBookInternalParams = {
    host : string
}