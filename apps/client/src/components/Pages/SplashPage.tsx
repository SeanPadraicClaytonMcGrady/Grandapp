import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SplashPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSeniorChecked, setIsSeniorChecked] = useState(false);
  const [isVolunteerChecked, setIsVolunteerChecked] = useState(false);

  const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSeniorChange = () => {
    setIsSeniorChecked(true);
    setIsVolunteerChecked(false);
  };

  const handleVolunteerChange = () => {
    setIsSeniorChecked(false);
    setIsVolunteerChecked(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
    }

    //PASSWORD VALIDATION
    if (!password) {
      setError("Please enter your password");
    }
    setError(null);
    setEmail("");
    setPassword("");

    if (isSeniorChecked) {
      navigate("/emotionalTasks");
    } else if (isVolunteerChecked) {
      navigate("/volunteer");
    } else {
      navigate("/welcome");
    }
  };
  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
            GrandApp
          </div>
          <div className="text-center font-medium text-xl">Login</div>
        </div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt1"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-300 rounded"
                  checked={isSeniorChecked}
                  onChange={handleSeniorChange}
                />
                <label htmlFor="" className="ml-2 text-sm text-gray-600">
                  Senior
                </label>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-300 rounded"
                  checked={isVolunteerChecked}
                  onChange={handleVolunteerChange}
                />
                <label htmlFor="" className="ml-2 text-sm text-gray-600">
                  Volunteer
                </label>
              </div>
            </div>
            <div>
              <button className="w-full py-2 px-4 bg-blue-400 hover:bg-blue-500 rounded-md text-white text-sm">
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
