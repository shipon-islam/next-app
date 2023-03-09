import { Inter } from "@next/font/google";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { BsCamera } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const inter = Inter({ subsets: ["latin"] });

function Gallery({ mydata }) {
  const [avatar, setAvatar] = useState({});
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const router = useRouter();
  console.log(mydata);

  const handleUpload = async () => {
    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };
    let formData = new FormData();
    formData.append("avatar", avatar);

    const { data } = await axios.post("api/upload", formData, config);
    setProgress(0);
    fileInputRef.current.value = "";
    setAvatar({});
    setImage(null);
    router.reload(window.location.pathname);
  };

  const handleDot = (id) => {
    const deleteBtn = document.getElementById(id);
    deleteBtn.classList.toggle("hidden");
  };
  const handleDelete = async (id) => {
    const { data } = await axios.get(`/api/photo/${id}`);
    console.log(data);
    router.reload(window.location.pathname);
  };
  return (
    <>
      <Head>
        <title>Photo upload</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <div
            style={{ width: progress + "%", background: "red", height: 10 }}
          ></div>
          <div className="relative w-[16rem] mx-auto">
            <Image
              className="rounded-md object-cover h-[160px]"
              width={250}
              height={250}
              src={image || "/background.jpg"}
              alt="s"
            />

            <div>
              <p className="overflow-hidden">{avatar?.name}</p>
              <button
                className="bg-orange-400 rounded-md px-3 py-1 block w-fit ml-auto"
                onClick={handleUpload}
              >
                upload
              </button>
            </div>
            <BsCamera
              onClick={() => fileInputRef.current.click()}
              className="absolute top-2 right-3 text-2xl cursor-pointer"
            />
          </div>
          <input
            className="hidden"
            ref={fileInputRef}
            type="file"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        <div className="grid grid-cols-[2fr_4fr_2fr_4fr] gap-3 mt-8 w-4/5 mx-auto">
          {mydata.reverse().map((photo) => (
            <div className="relative" key={photo._id}>
              <div className="absolute right-2">
                <HiOutlineDotsHorizontal
                  className="cursor-pointer ml-auto "
                  onClick={() => handleDot(photo._id)}
                />
                <div
                  id={photo._id}
                  onClick={() => handleDelete(photo._id)}
                  className="bg-white py-2 px-3 rounded-md cursor-pointer hidden"
                >
                  delete
                </div>
              </div>

              <Image
                alt="gallery"
                className="w-full object-cover rounded-md h-[180px]  block"
                width={100}
                height={100}
                src={`/uploads/${photo.avatar}`}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  // connectMongo();
  // const Apidata = await profileModel.find();
  return {
    props: {
      mydata: [
        {
          _id: "63e8d056450c77433a6ad5a3",
          user: "shipon islam",
          avatar: "remini20220515220316119_1676202070049.jpg",
          __v: 0,
        },
        {
          _id: "63e8d079450c77433a6ad5a7",
          user: "shipon islam",
          avatar: "remini20220505001511095_1676202105668.jpg",
          __v: 0,
        },
        {
          _id: "63e8d13d450c77433a6ad5b0",
          user: "shipon islam",
          avatar: "remini20220304163000516_1676202301796.jpg",
          __v: 0,
        },
        {
          _id: "63e8d14a450c77433a6ad5b3",
          user: "shipon islam",
          avatar: "latest-bw_1676202314932.jpg",
          __v: 0,
        },
        {
          _id: "63e8d199450c77433a6ad5b7",
          user: "shipon islam",
          avatar: "remini20220508201154558_1676202393947.jpg",
          __v: 0,
        },
        {
          _id: "63f3825c8813f1fdadd63f08",
          user: "shipon islam",
          avatar: "1660010109413-01_1676903004042.jpeg",
          __v: 0,
        },
        {
          _id: "63f382708813f1fdadd63f0b",
          user: "shipon islam",
          avatar: "1662123940191-01_1676903024739.jpeg",
          __v: 0,
        },
      ],
    }, // will be passed to the page component as props
  };
}
export default Gallery;