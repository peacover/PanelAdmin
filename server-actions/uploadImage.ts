"use server";

import {  cookieName } from "@/constants";

const upload_image = async (img : File) => {
    console.log("img: ", img);
    console.log("test: ", cookieName);
    // console.log("url: ", SUP_URL);
    // console.log("key: ", SUP_KEY);
};
export default upload_image;