import React from 'react';

const Echo = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-center">About Echo</h1>
      <div className="max-w-2xl text-lg text-center text-gray-700">
        <p>
          Hi! I'm Echo, a golden retriever with a big heart and an even bigger love for adventures.
        </p>
        <p className="mt-4">
          I spend my days hiking through trails, swimming in lakes, and napping by the desk while my human builds cool projects.
        </p>
        <p className="mt-4">
          When I'm not busy being adorable, I'm reminding everyone that a little joy, persistence, and playfulness can brighten any day.
        </p>
        <p className="mt-4">
          Thanks for visiting our little corner of the internet — hope to see you on a trail someday!
        </p>
      </div>
    </div>
  );
};

export default Echo;