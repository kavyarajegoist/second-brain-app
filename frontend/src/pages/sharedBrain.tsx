import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/ui/card";

const ShareBrain = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParms] = useSearchParams();
  const hash = searchParms.get("shareLink");
  useEffect(() => {
    const fetchShareBrain = async () => {
      try {
        console.log("Fetching shared brain with hash:", hash);
        const response = await axios.get(`/api/brain/${hash}`);
        console.log("Response data:", response.data);
        console.log("Content array:", response.data.content);
        setData(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shared brain:", error);
      } finally {
        setLoading(false);
      }
    };
    if (hash) {
      fetchShareBrain();
    } else {
      setLoading(false);
    }
  }, [hash]);
  return (
    <div>
      <div className="p-6 m-2 grid grid-cols-4 gap-5  ">
        {loading ? (
          "....."
        ) : (
          <>
            {data.length === 0
              ? "No Content Created Yet"
              : data.map((content) => (
                  <Card
                    id={content._id}
                    type={content.type}
                    link={content.link}
                    key={content._id}
                    title={content.title}
                    date={new Date(content.createdAt)}
                  />
                ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ShareBrain;
