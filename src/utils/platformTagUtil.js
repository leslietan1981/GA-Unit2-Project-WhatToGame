import { includedParentPlatforms, parentPlatformsData } from "../services/cached_datasets/parentPlatformsCached";

export const getParentObj = (childSlug) => {
  for (const parentPlatform of parentPlatformsData.results) {
    if (!includedParentPlatforms.includes(parentPlatform.slug)) continue;

    for (const childPlatform of parentPlatform.platforms) {
      if (childPlatform.slug === childSlug) return parentPlatform;
    }
  }
  return "";
};

export const getTagClassName = (slug, isOn = false) => {
  if (slug === "all" || includedParentPlatforms.includes(slug)) {
    console.log(`tag-${slug}${isOn ? "" : "-off"}`);
    return `tag-${slug}${isOn ? "" : "-off"}`;
  }
};

export const getParentPlatformParameter = (filters) => {
  return filters && filters.length > 0 ? `&parent_platforms=${filters.map((tag) => tag.id).join(",")}` : "";
};

export const getIncludedParentPlatformParameter = () => {
  const dataObjs = includedParentPlatforms.map((parentPlatformSlug) =>
    parentPlatformsData.results.find((dataObj) => dataObj.slug === parentPlatformSlug),
  );

  return getParentPlatformParameter(dataObjs);
};
