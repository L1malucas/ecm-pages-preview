/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { ChevronLeft, Download, Share, Star, Printer, Edit, Trash2, MoreHorizontal, Maximize2, Minimize2, ZoomIn, ZoomOut, FileText, RotateCw, Image, Film, ArrowLeft, ArrowRight } from 'lucide-react';

const DocumentPreview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  
  // Sample document metadata
  const documentInfo = {
    name: "Quarterly Report - Q1 2025.pdf",
    type: "PDF Document",
    size: "4.8 MB",
    modified: "March 28, 2025",
    author: "John Smith",
    starred: false
  };

  // Sample comments
  const comments = [
    { id: 1, user: "Sarah Johnson", content: "Please review page 3, I've updated the financial projections.", time: "Yesterday at 2:45 PM", page: 3 },
    { id: 2, user: "Mike Peters", content: "The executive summary needs to be more concise.", time: "Today at 9:30 AM", page: 1 },
    { id: 3, user: "Elena Gonzalez", content: "Great work on the market analysis section!", time: "Today at 11:15 AM", page: 4 }
  ];

  // Handle zoom in/out
  const handleZoom = (direction: string) => {
    if (direction === 'in' && zoomLevel < 200) {
      setZoomLevel(zoomLevel + 25);
    } else if (direction === 'out' && zoomLevel > 50) {
      setZoomLevel(zoomLevel - 25);
    }
  };

  // Handle page navigation
  const navigatePage = (direction: string) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Generate document preview based on file type
  const renderDocumentPreview = () => {
    // This would dynamically render different previews based on file type
    // For now, we'll simulate a document page
    return (
      <div className="flex flex-col items-center">
        <div 
          style={{ transform: `scale(${zoomLevel/100})` }}
          className="w-full max-w-2xl bg-white border shadow-sm overflow-hidden transition-transform duration-200"
        >
          {/* Sample document content */}
          <div className="p-10">
            <h1 className="text-2xl font-bold mb-6">Quarterly Report - Q1 2025</h1>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Executive Summary</h2>
            <p className="mb-4">
              This report provides a comprehensive analysis of company performance for Q1 2025. 
              Overall revenue increased by 15% compared to the previous quarter, with significant 
              growth in our enterprise segment.
            </p>
            <p className="mb-4">
              Key highlights include:
            </p>
            <ul className="list-disc ml-5 mb-4">
              <li className="mb-2">New enterprise clients: 37</li>
              <li className="mb-2">Customer retention rate: 94%</li>
              <li className="mb-2">Average deal size: $42,500</li>
              <li className="mb-2">Net Promoter Score: 72</li>
            </ul>
            <p>
              The following sections provide detailed analysis by department, market segment, 
              and geographic region.
            </p>
            
            {/* Comment indicators */}
            {showComments && currentPage === 1 && (
              <div className="absolute top-20 right-20 h-6 w-6 bg-yellow-400 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold">
                1
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-100 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Top navigation bar */}
      <div className="bg-white shadow-sm p-3 flex items-center">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="ml-4">
          <h1 className="text-lg font-medium">{documentInfo.name}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>{documentInfo.type}</span>
            <span className="mx-2">•</span>
            <span>{documentInfo.size}</span>
            <span className="mx-2">•</span>
            <span>Modified {documentInfo.modified}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Printer className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Download className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Share className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Star className={`h-5 w-5 ${documentInfo.starred ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Edit className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="bg-white border-t border-b p-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => navigatePage('prev')}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => navigatePage('next')}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="mx-1 text-sm">
            <input 
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(Math.min(Math.max(1, parseInt(e.target.value) || 1), totalPages))}
              className="w-12 text-center border rounded p-1"
            />
            <span className="mx-1 text-gray-600">of {totalPages}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => handleZoom('out')}
            disabled={zoomLevel <= 50}
            className={`p-2 rounded-full ${zoomLevel <= 50 ? 'text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <div className="text-sm text-gray-600 w-20 text-center">
            {zoomLevel}%
          </div>
          <button 
            onClick={() => handleZoom('in')}
            disabled={zoomLevel >= 200}
            className={`p-2 rounded-full ${zoomLevel >= 200 ? 'text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className={`p-2 rounded-full ${showComments ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <RotateCw className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Document preview */}
        <div className="flex-1 overflow-auto p-6 flex justify-center">
          {renderDocumentPreview()}
        </div>
        
        {/* Comments sidebar - conditionally rendered */}
        {showComments && (
          <div className="w-80 border-l bg-white overflow-auto">
            <div className="p-4 border-b">
              <h2 className="font-medium text-lg">Comments</h2>
            </div>
            <div className="divide-y">
              {comments.map(comment => (
                <div key={comment.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                      {comment.user.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="font-medium">{comment.user}</span>
                        <span className="ml-2 text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                      <div className="mt-1 text-xs text-gray-500">Page {comment.page}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add missing component
const MessageSquare = (props: { className: any; }) => {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

export default DocumentPreview;
