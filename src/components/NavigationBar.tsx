import React from "react";
import Link from "next/link";

const NavigationBar: React.FC = () => {
  return (
    <div className="flex justify-center gap-8  items-center p-8 bg-text-gray-900">
      <Link href="/" passHref>
        <button className="mr-4 text-white bg-transparent border border-solid border-white py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:bg-white hover:text-gray-900 hover:border-text-gray-900 hover:scale-110">
          Home
        </button>
      </Link>
      <Link href="/analytics" passHref>
        <button className="text-white bg-transparent border border-solid border-white py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:bg-white hover:text-gray-900 hover:border-text-gray-900 hover:scale-110">
          Analytics
        </button>
      </Link>
    </div>
  );
};

export default NavigationBar;
