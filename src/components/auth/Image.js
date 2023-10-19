import { useRef, useState } from "react";

export default function Image({ readableImage, setImage, setReadableImage }) {

  const [error, setError] = useState("");
  const inputImgRef = useRef();

  // upload or read an image

  const hanldeImage = (e) => {
    const profilePic = e.target.files[0];

    if (
      profilePic.type !== "image/png" &&
      profilePic.type !== "image/jpeg" &&
      profilePic.type !== "image/webp"
    ) {
        setError(`${profilePic.name} format is not supported`)
      return;
    } else if (profilePic.size > 1024*1024*6) // 6 mb
    {
        setError(`${profilePic.name} is too large, it should not be more than 6 mb.`)
      return;
    } else {
        setError("");
        setImage(profilePic);
        // for reading the image
        const reader = new FileReader();
        reader.readAsDataURL(profilePic);
        reader.onload = (e) => {
            setReadableImage(e.target.result)
        }
    }
  }

  // remove image

  const handleChangeImage = () => {
    setImage("");
    setReadableImage("");
  }

  return (
    <div className="mt-8 content-center dark:text-dark_text1 space-y-1">
      <label htmlFor="image" className="text-sm font-bold tracking-wide">
        Profile Picture (Optional)
      </label>

      {readableImage ? (
        <div>
          <img
            src={readableImage}
            alt="profilePicture"
            className="w-20 h-20 object-cover rounded-full"
          />

          <div
            className="mt-2 w-20 py-1 dark:bg-dark_bg3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
            onClick={() => handleChangeImage()}
          >
            remove 
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputImgRef.current.click()}
        >
          Upload image
        </div>
      )}

      <input
        type="file"
        name="image"
        id="image"
        hidden
        ref={inputImgRef}
        accept="image/png, image/jpeg, image/webp"
        onChange={hanldeImage}
      />
      {/*error*/}
      <div className="mt-2">
        <p className="text-red-400">{ error }</p>
      </div>
    </div>
  );
}
