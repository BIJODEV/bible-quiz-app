import React, { useState } from 'react';

const Footer = () => {
  const [showMobileTooltip, setShowMobileTooltip] = useState(false);

  return (
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
      <div className="group relative">
        {/* Main Footer */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-purple-50/80 to-blue-50/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 sm:py-4 cursor-pointer sm:cursor-help"
          onClick={() => setShowMobileTooltip(!showMobileTooltip)}
        >
          <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
            <span className="text-xl sm:text-2xl text-purple-600">⛪</span>
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-purple-800 text-sm sm:text-base">Know Your Church</h3>
              <p className="text-xs sm:text-sm text-purple-600">Church Platform - Coming Soon</p>
            </div>
          </div>
          <a 
            href="mailto:knowyourchurch07@gmail.com?subject=Know Your Church App Inquiry&body=Hello, I'd like to learn more about the church management platform and how I can support this initiative."
            className="bg-white px-3 sm:px-4 py-2 rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors font-medium text-xs sm:text-sm w-full sm:w-auto text-center"
            onClick={(e) => e.stopPropagation()}
          >
            📧 Support Inquiry
          </a>
        </div>

        {/* Hover Tooltip - Hidden on mobile, shown on hover for desktop */}
        <div className="absolute bottom-full left-0 right-0 mb-2 hidden sm:group-hover:block z-10">
          <div className="bg-white border border-purple-200 rounded-lg shadow-lg p-3 sm:p-4 max-w-md mx-auto">
            <h4 className="font-bold text-purple-800 mb-2 sm:mb-3 text-sm sm:text-base">Digital Transformation for Churches</h4>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Multi-level Access</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Attendance Tracking</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Class Management</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Gallery System</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Role-based Dashboards</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Student Records</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded p-2 sm:p-3 border border-purple-100">
              <p className="text-xs text-purple-700 text-center leading-relaxed">
                Project aims to help churches modernize their Sunday School programs. 
                <br className="hidden xs:block" />
                <span className="font-semibold">Community support helps make this vision accessible.</span>
                <br className="hidden sm:block" />
                <span className="font-semibold block mt-1">MAIL : knowyourchurch07@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Touch Tooltip - Shows only when clicked/tapped */}
        {showMobileTooltip && (
          <div className="sm:hidden mt-3 bg-white border border-purple-200 rounded-lg shadow-lg p-3">
            <h4 className="font-bold text-purple-800 mb-2 text-sm">Digital Transformation for Churches</h4>
            
            <div className="grid grid-cols-1 gap-2 text-xs text-gray-600 mb-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Multi-level Access</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Attendance Tracking</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Class Management</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Gallery System</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Role-based Dashboards</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500 text-xs">●</span>
                  <span>Student Records</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded p-2 border border-purple-100">
              <p className="text-xs text-purple-700 text-center leading-relaxed">
                Project helps churches modernize Sunday School programs. 
                <span className="font-semibold block mt-1">Community support makes this accessible.</span>
                <span className="font-semibold block mt-1">MAIL : knowyourchurch07@gmail.com</span>
              </p>
            </div>
            
            {/* Close button for mobile */}
            <button
              onClick={() => setShowMobileTooltip(false)}
              className="w-full mt-3 bg-purple-500 text-white py-2 rounded-lg font-medium text-sm"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;