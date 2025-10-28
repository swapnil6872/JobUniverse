import { Link, useLocation } from 'react-router-dom';

const StepNavigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex items-center justify-center gap-6 my-8">
      {/* Personal Details */}
      <Link to="/personal-details" className="flex flex-col items-center">
        <div
          className={`w-14 h-14 flex items-center justify-center rounded-full border-2 ${
            isActive('/personal-details') ? 'border-blue-600 bg-blue-100' : 'border-gray-300'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </div>
        <span className="mt-2 text-sm font-medium text-gray-700">Personal Details</span>
      </Link>

      {/* Connecting Line */}
      <div className="w-12 h-0.5 bg-gray-300" />

      {/* Organization Details */}
      <Link to="/organization-details" className="flex flex-col items-center">
        <div
          className={`w-14 h-14 flex items-center justify-center rounded-full border-2 ${
            isActive('/organization-details') ? 'border-blue-600 bg-blue-100' : 'border-gray-300'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7M3 7l9-4 9 4M9 21h6" />
          </svg>
        </div>
        <span className="mt-2 text-sm font-medium text-gray-700">Organization Details</span>
      </Link>
    </div>
  );
};

export default StepNavigation;