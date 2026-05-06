import { devParentPlatforms } from "../services/dev_datasets/devParentPlatforms";

export const getParentObj = (childSlug) => {
  const includedParentPlatforms = ["pc", "playstation", "xbox", "ios", "android", "mac", "nintendo"];

  for (const parentPlatform of devParentPlatforms.results) {
    if (!includedParentPlatforms.includes(parentPlatform.slug)) continue;

    for (const childPlatform of parentPlatform.platforms) {
      if (childPlatform.slug === childSlug) return parentPlatform;
    }
  }
  return "";
};

export const getTagClassName = (slug) => {
  switch (slug) {
    case "pc":
      return "tag-pc";
    case "playstation":
      return "tag-ps";
    case "xbox":
      return "tag-xbox";
    case "ios":
      return "tag-ios";
    case "android":
      return "tag-android";
    case "mac":
      return "tag-mac";
    case "nintendo":
      return "tag-nintendo";
  }
  return false;
};

export const getParentPlatformParameter = (filters) => {
  return filters && filters.length > 0 ? `&parent_platforms=${filters.map((tag) => tag.id).join(",")}` : "";
};
