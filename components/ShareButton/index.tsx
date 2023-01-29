import { RWebShare } from "react-web-share";
import { IoIosShareAlt } from "react-icons/io";

const Share = () => {
   return (
      <div>
         <RWebShare
            data={{
               text: "Search and Find Your INEC Polling Unit and view it on Google Maps",
               url: "https://inec-polling-unit-finder.vercel.app/",
               title: "INEC Polling Unit Finder",
            }}
         >
            <IoIosShareAlt
               size={35}
               style={{ position: "absolute", right: "20rem", top: "8rem" }}
            />
         </RWebShare>
         <span style={{ position: "absolute", right: "20rem", top: "10rem" }}>
            Share
         </span>
      </div>
   );
};

export default Share;
