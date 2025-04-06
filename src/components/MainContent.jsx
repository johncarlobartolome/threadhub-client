import { useState } from "react";
import { uploadImage } from "../utils/uploadImage";
import { deleteImage } from "../utils/deleteImage";
import api from "../services/api";

export default function MainContent() {
  const user = JSON.parse(localStorage.getItem("token"));
  const userId = user?._id;
  console.log(userId);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newPreviews = imageFiles.map((file) => URL.createObjectURL(file));

    setImages([...images, ...imageFiles]);
    setPreviewUrls([...previewUrls, ...newPreviews]);
  };

  const removeImage = (index) => {
    const updateImages = [...images];
    const updatedPreviews = [...previewUrls];
    updateImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updateImages);
    setPreviewUrls(updatedPreviews);
  };

  const handlePost = async () => {
    if (!text && images.length === 0) return;

    const uploadedUrls = [];
    try {
      const uploadPromises = images.map((file) => uploadImage(file, userId));
      const urls = await Promise.all(uploadPromises);
      uploadedUrls.push(...urls);
      console.log(urls);
      const res = await api.post("/threads", {
        userId,
        content: text,
        mediaUrls: uploadedUrls,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Thread creation failed.");
      // onPost(result.thread);
      setText("");
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error("Post failed:", error);
      await Promise.all(uploadedUrls.map(deleteImage));
      alert("Failed to post thread. Uploaded images has been removed.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <textarea
        className="w-full border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring focus:ring-blue-200"
        id=""
        placeholder="Share a thought, game clip, or even your favorite moment!"
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      {previewUrls.length > 0 && (
        <div className="mt-4 w-128">
          <div className="overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="flex gap-4 flex-nowrap w-max pb-2">
              {previewUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative w-32 h-32 rounded overflow-hidden border"
                >
                  <img
                    src={url}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    title="Remove image"
                    className="pointer-cursor absolute top-1 right-1 bg-black bg-opacity-60 text-white text-cs px-1 rounded hover:bg-opacity-90"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <label
          htmlFor="image"
          className="cursor-pointer text-blue-600 font-medium"
        >
          Add Image
          <input
            id="image"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <div className="ml-auto">
          <button
            onClick={handlePost}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
