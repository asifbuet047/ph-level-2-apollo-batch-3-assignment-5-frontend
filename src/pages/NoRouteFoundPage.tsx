import Lottie from "lottie-react";
import NOT_FOUND from "../../public/PAGE_NOT_FOUND_ANIMATION.json";

export default function NoRouteFoundPage() {
  return (
    <div className="border-2 flex flex-row justify-center align-middle">
      <div className="w-1/2">
        <Lottie animationData={NOT_FOUND} />
      </div>
    </div>
  );
}
