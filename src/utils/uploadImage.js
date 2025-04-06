import supabase from "../lib/supabaseClient.js";

export const uploadImage = async (file, userId) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("threadhub-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("threadhub-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
};
