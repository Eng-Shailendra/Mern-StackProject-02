import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaUsers,
  FaBox,
  FaEnvelope,
} from "react-icons/fa";

const AboutusPage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/Eng-Shailendra/repos?sort=updated&per_page=6",
        );
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const profileData = {
    name: "Shailendra Kumar Sahu",
    title: "Full Stack Developer",
    bio: "Learning the ropes of coding and eager to contribute to open source projects.",
    avatar: "https://avatars.githubusercontent.com/u/71807490?v=4",
    github: "https://github.com/Eng-Shailendra",
    linkedin: "https://www.linkedin.com/in/shailendra-sahu-186468220/",
    email: "shailendra2130@gmail.com",
    stats: {
      repos: 12,
      followers: 1,
      following: 4,
    },
  };

  return (
    <div className="min-h-screen bg-gradient from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="h-32 bg-gradient from-blue-500 to-blue-600"></div>

          <div className="px-6 sm:px-8 pb-8">
            {/* Profile Image */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {profileData.name}
                </h1>
                <p className="text-2xl text-black-600 font-semibold mt-2 p-5">
                  {profileData.title}
                </p>
                <p className="text-gray-600 max-w-2xl">{profileData.bio}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center sm:justify-start mb-8 flex-wrap">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-300 shadow-md"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
              >
                <FaEnvelope size={20} />
                <span>Email</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {profileData.stats.repos}
                </div>
                <div className="text-gray-600 flex items-center justify-center gap-2">
                  <FaBox size={16} />
                  <span>Repositories</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {profileData.stats.followers}
                </div>
                <div className="text-gray-600 flex items-center justify-center gap-2">
                  <FaUsers size={16} />
                  <span>Followers</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {profileData.stats.following}
                </div>
                <div className="text-gray-600 flex items-center justify-center gap-2">
                  <FaCode size={16} />
                  <span>Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            About This Project
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Welcome to our e-commerce platform! This is a full-stack web
            application built with the MERN (MongoDB, Express, React, Node.js)
            stack. Our mission is to provide a seamless shopping experience with
            a modern, intuitive interface and robust backend infrastructure.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            The platform showcases cutting-edge technologies including real-time
            updates, secure payment processing, and responsive design that works
            perfectly on all devices.
          </p>
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-gray-700">
              <span className="font-semibold text-blue-600">Developer:</span>{" "}
              Shailendra Kumar Sahu - A passionate developer committed to
              building scalable and user-friendly applications.
            </p>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Recent Projects
          </h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.length > 0 ? (
                repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6 block hover:translate-y-2"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 break-word">
                          {repo.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                          {repo.description || "No description available"}
                        </p>
                      </div>
                      <FaBox
                        className="text-blue-500 flex shrink-0 ml-4"
                        size={24}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      {repo.language && (
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {repo.language}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        ⭐ {repo.stargazers_count}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No repositories found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaCode className="text-blue-600" />
                Frontend
              </h3>
              <ul className="space-y-2">
                {[
                  "React.js",
                  "Tailwind CSS",
                  "Vite",
                  "JavaScript (ES6+)",
                  "Redux",
                ].map((skill) => (
                  <li
                    key={skill}
                    className="text-gray-700 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaCode className="text-blue-600" />
                Backend
              </h3>
              <ul className="space-y-2">
                {[
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "REST APIs",
                  "Authentication",
                ].map((skill) => (
                  <li
                    key={skill}
                    className="text-gray-700 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutusPage;
