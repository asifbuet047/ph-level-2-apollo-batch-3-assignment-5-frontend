import Lottie from "lottie-react";
import NOT_FOUND from "../../public/PAGE_NOT_FOUND_ANIMATION.json";

export default function NoRouteFoundPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Lottie animationData={NOT_FOUND} />
    </div>
  );
}
