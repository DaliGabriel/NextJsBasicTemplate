import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IIcon {
  width: number;
  height?: number;
}

const HeaderLeftIcon = (props: IIcon) => {
  const { width, height } = props;

  return (
    <>
      <div className="flex lg:flex-1">
        <Link href={"/"}>
          <span className="sr-only">HeaderLeftIcon</span>
          <Image
            src="/HeaderLeftIcon.svg"
            width={width}
            height={height}
            alt="HeaderLeftIcon"
            priority
          />
        </Link>
      </div>
    </>
  );
};

export default HeaderLeftIcon;
