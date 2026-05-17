import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Home() {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const res = await axios.get("https://capstone-project-1fpf.onrender.com/user-api/articles", {
          withCredentials: true
        });
        setArticles(res.data.payload || []);
      } catch (err) {
        console.log("Could not fetch articles:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  const handleStartReading = () => {
    if (!isAuthenticated) {
      toast.error("Please register or login to read articles");
      navigate("/login");
      return;
    }

    if (articles.length === 0) {
      toast("No articles available yet");
      return;
    }

    navigate(`/article/${articles[0]._id}`, {
      state: articles[0],
    });
  };

  const handleWriteArticle = () => {
    if (!isAuthenticated) {
      toast.error("Please login as an author to write an article");
      navigate("/login");
      return;
    }

    if (currentUser?.role !== "AUTHOR") {
      toast.error("Only authors can write articles");
      return;
    }

    navigate("/author-profile/write-article");
  };

  return (
    <div className="min-h-screen bg-[#f7f2ea]">

      {/* HERO SECTION */}
      <div className="max-w-6xl min-h-[85vh] mx-auto grid md:grid-cols-2 gap-6 items-center py-20 px-10">

        <div className="flex flex-col justify-center text-center md:text-left">
          <p className="uppercase tracking-widest text-sm text-[#b57239] mb-5">
            Read • Write • Share
          </p>
          <h1 className="text-6xl font-serif font-semibold text-[#2e2e2e] mb-1">
            Stories that inspire minds, one article at a time.
          </h1>

          <p className="text-[#5c5c5c] text-lg mt-2 leading-8">
            A blogging platform where users can read articles and authors can
            publish their own content related to technology, AI and web
            development.
          </p>

          {isAuthenticated && (
            <div className="mt-6">
              <button
                className="inline-flex items-center gap-2 text-blue-600 hover:text-[#b55239] text-lg font-medium"
                onClick={() => {
                  if (currentUser?.role === "AUTHOR") {
                    navigate("/author-profile");
                  } else if (currentUser?.role === "USER") {
                    navigate("/user-profile");
                  } else {
                    navigate("/admin-profile");
                  }
                }}
              >
                Go to Profile →
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <button
            className="bg-[#d4a017] hover:bg-[#bf8f12] text-[#2e2e2e] font-semibold px-6 py-3 rounded-xl w-full md:w-auto transition disabled:opacity-60"
            onClick={handleStartReading}
            disabled={loading}
          >
            Start Reading
          </button>
          <button
            className="border border-[#b55239] text-[#b55239] hover:bg-[#b55239] hover:text-white px-6 py-3 rounded-xl w-full md:w-auto transition"
            onClick={handleWriteArticle}
          >
            Write Article
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
