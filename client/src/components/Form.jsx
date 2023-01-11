import { useEffect } from 'react';
import { useState } from 'react';

export const Form = () => {
  const [images, setImages] = useState({
    styleImage: null,
    transferImage: null,
  });
  const [result, setResult] = useState();

  const handleChange = (event, type) => {
    const extensionName = event.target.files[0].name.split('.')[1];
    if (extensionName === 'jpg' || extensionName === 'jpeg') {
      setImages({
        ...images,
        [type]: event.target.files[0],
      });
    } else {
      setImages({
        ...images,
        [type]: null,
      });
      alert('Please make sure to upload .jpg files.');
    }
  };

  // make this an async function
  const handleSubmit = (event) => {
    event.preventDefault();

    if (images.styleImage !== null && images.transferImage !== null) {
      console.log('here');
      let imageData = new FormData();

      // imageData.append('images', images)

      imageData.append('images', images.styleImage);
      imageData.append('images', images.transferImage);
      console.log(imageData);

      fetch('http://localhost:4000/upload', {
        method: 'post',
        body: imageData,
      })
        .then((res) => res.text())
        .then((resBody) => {
          setResult(resBody);
        });

      console.log('submitted!');
    } else {
      alert('Please make sure to upload a style image and a transfer image.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-row justify-center'>
          <div>
            <div className="flex justify-center px-2">
              <div className="mb-3 w-96">
                <label
                  htmlFor="formFile"
                  className="form-label inline-block mb-2 text-white"
                >
                  Upload Styling Image
                </label>
                <input
                  className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0               
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  id="formFile"
                  onChange={(e) => handleChange(e, 'styleImage')}
                />
              </div>
            </div>
            {result && (
              <img
                src={`http://localhost:4000/${result}/style.jpeg`}
                alt={'Image'}
                className="object-contain mx-auto py-5 h-100 w-100"
                width={200}
                length={200}
              ></img>
            )}
          </div>
          <div>
            <div className="flex justify-center px-2">
              <div className="mb-3 w-96">
                <label
                  htmlFor="formFile"
                  className="form-label inline-block mb-2 text-white"
                >
                  Upload Transfer Image
                </label>
                <input
                  className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0               
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  id="formFile"
                  onChange={(e) => handleChange(e, 'transferImage')}
                />
              </div>
            </div>
            {result && (
              <img
                src={`http://localhost:4000/${result}/transfer.jpeg`}
                alt={'Image'}
                className="object-contain mx-auto py-5 h-100 w-100"
                width={200}
                length={200}
              ></img>
            )}
          </div>
        </div>  
        <button className="mx-auto flex p-2 rounded-md bg-white">
          Apply Style Transfer
        </button>
      </form>
      {result && (
        <img
          src={`http://localhost:4000/${result}/generated.jpg`}
          alt={'Image'}
          className="object-contain mx-auto py-5 h-100 w-100"
          width={500}
          length={500}
        ></img>
      )}
    </div>
  );
};
