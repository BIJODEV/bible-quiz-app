import React from 'react';

const Footer = () => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="group relative">
        {/* Main Footer */}
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-50/80 to-blue-50/80 backdrop-blur-sm rounded-lg px-6 py-4 cursor-help">
          <div className="flex items-center space-x-4">
            <span className="text-2xl text-purple-600">⛪</span>
            <div>
              <h3 className="font-semibold text-purple-800">Know Your Church</h3>
              <p className="text-sm text-purple-600">Church Management Platform - Coming Soon</p>
            </div>
          </div>
          <a 
            href="mailto:knowyourchurch07@gmail.com?subject=Know Your Church App Inquiry&body=Hello, I'd like to learn more about the church management platform and how I can support this initiative."
            className="bg-white px-4 py-2 rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors font-medium text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            📧 Support Inquiry
          </a>
        </div>

        {/* Hover Tooltip */}
        <div className="absolute bottom-full left-0 right-0 mb-2 hidden group-hover:block z-10">
          <div className="bg-white border border-purple-200 rounded-lg shadow-lg p-4 max-w-md mx-auto">
            <h4 className="font-bold text-purple-800 mb-3">Digital Transformation for Churches</h4>
            
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500">●</span>
                  <span>Multi-level Access</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500">●</span>
                  <span>Attendance Tracking</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500">●</span>
                  <span>Class Management</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500">●</span>
                  <span>Gallery System</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500">●</span>
                  <span>Role-based Dashboards</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500">●</span>
                  <span>Student Records</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded p-3 border border-purple-100">
              <p className="text-xs text-purple-700 text-center">
                Project aims to help churches modernize their Sunday School programs. 
                <br />
                <span className="font-semibold">Community support helps make this vision accessible to more churches.</span>
                <br />
                <span className="font-semibold">MAIL : knowyourchurch07@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;