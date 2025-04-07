import supabase from "../lib/supabaseClient";
import { extractFileNameFromUrl } from "./extractFileName";

export const deleteImage = async (url) => {
  const fileName = extractFileNameFromUrl(url);
  console.log("Debugging", fileName);
  const { error } = await supabase.storage
    .from("threadhub-images")
    .remove([fileName]);

  if (error) console.error("Failed to delete image:", error);
};
