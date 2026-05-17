import { useEffect } from "react";
import check from "../../../public/check.svg";


export default function MessageComponent({
    message,
    duration,
    type
  }:{
    message: string;
    duration: number;
    type: string
  }) {

    useEffect(() => {
      const messageBox = document.getElementById("message-box");
      if (messageBox) {
        messageBox.classList.remove("hidden");
        setTimeout(() => messageBox.classList.add("hidden"), duration);
      }
    }, [duration])
  return(
    <div
      id="message-box"
      className={`flex items-center fixed right-4 top-4 w-fit min-h-5 bg-[#0C130D] border p-3 rounded-md shadow-lg ${type === "success" ? "border-[#81C784]" : "border-[#E57373]"} z-100`}
    >
      <div className="w-4 h-4 mr-2">
        {type === "success" ?
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#CCE8CD">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#5EAB62" fill-rule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path>
          </g>
        </svg>
        :
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#8A2D27" stroke-width="2" stroke-linecap="round"></path>
            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#8A2D27" stroke-width="2" stroke-linecap="round"></path>
          </g>
        </svg>
        }
      </div>

      <p className={`text-sm ${type === "success" ? "text-[#CCE8CD]" : "text-[#F4C7C7]"} flex items-center gap-2`}>
        {message}
      </p>
    </div>
  )
}