/* eslint-disable react/no-unescaped-entities */

import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import Image from "next/image";
import char from "../public/char.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto text-center p-20">
        <h2 className="text-4xl py-2 text-teal-600 font-medium font-burtons md:text-6xl dark:text-teal-400">
          Lyse A. Aneze
        </h2>
        <h3 className="text-2xl py-4 md:text-3xl dark:text-gray-200">
          Full Stack Developer
        </h3>
        <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-2xl mx-auto dark:text-gray-200">
          Specializing in robust web solutions that drive business
          growth and user engagement. Ready to transform your digital landscape?
          Let's connect!
        </p>
        <div className="flex justify-center gap-4 py-6">
          <button className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300 dark:bg-teal-500 dark:hover:bg-teal-600">
            Email Me
          </button>
          <a
            href="#portfolio"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            View Portfolio
          </a>
        </div>
        <div className="text-5xl flex justify-center gap-16 py-6 text-gray-600 dark:text-gray-400">
          <AiFillLinkedin className="cursor-pointer hover:text-teal-600 transition duration-300" />
          <AiFillGithub className="cursor-pointer hover:text-teal-600 transition duration-300" />
        </div>
        <div className="relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 overflow-hidden md:w-96 md:h-96 mt-10">
          <Image src={char} layout="fill" objectFit="cover" alt="Character" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
