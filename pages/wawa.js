import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import { useTheme } from "next-themes";
// Data
import data from "../data/portfolio.json";

const Wawa = () => {

   const uploadFile= async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]!
        const filename = file.name
        const fileType = file.type
        const res = await fetch(
            `/api/wawa?file=${filename}&fileType=${fileType}`
        )
        const { url } = await res.json()
        const upload = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: { "Content-Type": fileType }
        })
        if (upload.ok) {
            console.log('Uploaded successfully!')
        } else {
            console.error('Upload failed.')
        }
        const s3FileUrl = `https://<wawa-calc>.s3.us-east-1.amazonaws.com/${filename}`
        console.log('File URL', s3FileUrl)
    }

  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);
  
  return (
    <>

      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header isBlog />
        {mount && (
            <div
              className={`w-full ${
                mount && theme.theme === "dark" ? "" : ""
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >

              <div align="center" className="mt-5">
                
                <H4>Please Drop a CSV or Excel file below</H4>
                <p>All uploads are encrypted over pre-signed url and stored in amazon S3</p>
                <input type="file" accept=".csv, .xlsx, pdf" hidden onChange={uploadFile} />
           
              </div>

            </div>
        )}
      </div>
    </>
  );
};

export default Resume;
