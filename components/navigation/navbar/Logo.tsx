"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const Logo = () => {
  //update the size of the logo when the size of the screen changes
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  return (
    <>
      <Link href="/">
        <p className="text-2xl text-cr-darkgrey">Gymi-Vorbereitungskurse Vergleich</p> {/* Angepasster Text */}
      </Link>
    </>
  );
};

export default Logo;

