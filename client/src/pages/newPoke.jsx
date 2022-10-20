import React, { useState } from "react";

import Layout from "../components/common/Layout";
import Form from "../components/common/Form";
import Example from "../components/common/Form/Example";

export default function NewPoke() {
  return (
    <Layout>
      <div className="flex justify-center items-center bg-[#282c34] min-h-screen">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    "url('https://cdn.dribbble.com/users/472667/screenshots/2861878/pokemon-go-icons.png')",
                }}
              />
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <Form />
                {/* <Example /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
