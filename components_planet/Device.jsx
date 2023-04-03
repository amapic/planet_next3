import dynamic from "next/dynamic";

function Device(desktop, mobile, children) {
  const { isMobile } = useDevice();

  return (isMobile && mobile) || (!isMobile && desktop) ? children : null;
}

const Device = dynamic(
  () => import("./Device").then((mod) => mod.Device),
  {
    ssr: false,
  }
);

export default Device
