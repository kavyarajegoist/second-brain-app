import { Button } from "../components/ui/button";
import ShareIcon from "../components/icons/shareicon";
import { useEffect, useState } from "react";

import Sidebar from "../components/sidebar";
import AddContent from "../components/addcontent";
import Card from "../components/ui/card";
import axios from "axios";
import { useAuth } from "../components/context/authProvider";

const LandingPage = () => {
  const { authToken } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("/api/content/", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setData(response.data.contents);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [data]);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="flex flex-row h-screen w-full ">
        <Sidebar />
        <div className=" flex-1 mt-12 flex flex-col ">
          <div className="justify-between flex gap-2 right-0 px-10 items-center">
            <div>
              <h1 className="text-4xl font-semibold">All Notes</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                text="Share Brain"
                variant="secondary"
                size="lg"
                startIcon={<ShareIcon size="lg" color="#6962e0" />}
              />
              <Button
                text="Add Content"
                size="lg"
                onClick={() => setVisible(!visible)}
              />
            </div>
          </div>

          {visible && <AddContent setVisible={setVisible} />}
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
      </div>
    </>
  );
};

export default LandingPage;
