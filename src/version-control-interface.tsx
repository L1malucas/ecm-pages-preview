/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronRight, CheckCircle2, XCircle, AlarmClock, Calendar, User, MoreVertical,  Edit,  ArrowUpRight, ArrowDownRight, RotateCcw, GitBranch, Tags, CheckSquare, AlertTriangle, Shield, Eye, ArrowLeft, MessageSquare, Copy, Plus } from 'lucide-react';

export default function VersionControlInterface ()  {
  interface Version {
    id: string;
    name: string;
    status?: string;
    author: string;
    date: string;
    time: string;
    changes: string;
    comment: string;
    qualifications?: Array<any>;
    subversions?: Array<any>;
  }
  
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [expandedVersions, setExpandedVersions] = useState(['v1.2']);
  const [activeTab, setActiveTab] = useState('timeline');
  const [documentStatus, ] = useState('approved');
  const [showQualificationForm, setShowQualificationForm] = useState(false);

  // Sample document
  const document = {
    id: 'DOC-2025-0142',
    name: 'Corporate Policy - Data Security.docx',
    owner: 'Jennifer Martinez',
    department: 'Legal',
    status: documentStatus,
    currentVersion: 'v1.2.3',
    created: 'February 12, 2025',
    modified: 'March 29, 2025'
  };

  // Sample versions
  const versions = [
    {
      id: 'v1.2',
      name: 'Version 1.2',
      status: 'current',
      author: 'Jennifer Martinez',
      date: 'March 29, 2025',
      time: '14:35',
      changes: 'Major update',
      comment: 'Incorporated legal review feedback and compliance requirements',
      qualifications: [
        { type: 'review', status: 'approved', by: 'David Chen', date: 'March 29, 2025', comments: 'Meets all compliance requirements' },
        { type: 'legal', status: 'approved', by: 'Sarah Johnson', date: 'March 28, 2025', comments: 'Approved with minor suggestions' },
        { type: 'technical', status: 'approved', by: 'Michael Rodriguez', date: 'March 27, 2025', comments: 'Technical specifications verified' }
      ],
      subversions: [
        {
          id: 'v1.2.3',
          name: 'Version 1.2.3',
          status: 'current',
          author: 'Jennifer Martinez',
          date: 'March 29, 2025',
          time: '14:35',
          changes: 'Minor fix',
          comment: 'Fixed formatting issues in section 3.2'
        },
        {
          id: 'v1.2.2',
          name: 'Version 1.2.2',
          author: 'Jennifer Martinez',
          date: 'March 28, 2025',
          time: '16:20',
          changes: 'Content update',
          comment: 'Updated security protocols in section 4'
        },
        {
          id: 'v1.2.1',
          name: 'Version 1.2.1',
          author: 'Jennifer Martinez',
          date: 'March 27, 2025',
          time: '11:45',
          changes: 'Minor update',
          comment: 'Added clarification to compliance section'
        }
      ]
    },
    {
      id: 'v1.1',
      name: 'Version 1.1',
      author: 'Jennifer Martinez',
      date: 'March 15, 2025',
      time: '09:30',
      changes: 'Major update',
      comment: 'Complete revision of security policies',
      qualifications: [
        { type: 'review', status: 'approved', by: 'David Chen', date: 'March 16, 2025', comments: 'Approved with comments' },
        { type: 'legal', status: 'requested_changes', by: 'Sarah Johnson', date: 'March 16, 2025', comments: 'Needs clarification on regulations' }
      ],
      subversions: []
    },
    {
      id: 'v1.0',
      name: 'Version 1.0',
      author: 'Robert Williams',
      date: 'February 12, 2025',
      time: '15:20',
      changes: 'Initial version',
      comment: 'First draft of data security policy',
      qualifications: [
        { type: 'review', status: 'approved', by: 'David Chen', date: 'February 14, 2025', comments: 'Initial approval for development' }
      ],
      subversions: []
    }
  ];

  // Toggle expand/collapse for version
  const toggleVersionExpand = (versionId: string) => {
    if (expandedVersions.includes(versionId)) {
      setExpandedVersions(expandedVersions.filter(id => id !== versionId));
    } else {
      setExpandedVersions([...expandedVersions, versionId]);
    }
  };

  // Handle version selection
  const handleVersionSelect = (version: Version) => {
    setSelectedVersion(version);
  };

  // Get status badge styling
  const getStatusBadge = (status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
    switch (status) {
      case 'approved':
        return (
          <span className="flex items-center text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center text-orange-700 bg-orange-100 px-2 py-1 rounded-full text-xs">
            <AlarmClock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        );
      case 'requested_changes':
        return (
          <span className="flex items-center text-amber-700 bg-amber-100 px-2 py-1 rounded-full text-xs">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Changes Requested
          </span>
        );
      default:
        return (
          <span className="flex items-center text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  // Get qualification type badge
  const getQualificationTypeBadge = (type: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
    switch (type) {
      case 'review':
        return (
          <span className="flex items-center text-blue-700 bg-blue-100 px-2 py-1 rounded-full text-xs">
            <Eye className="h-3 w-3 mr-1" />
            Content Review
          </span>
        );
      case 'legal':
        return (
          <span className="flex items-center text-purple-700 bg-purple-100 px-2 py-1 rounded-full text-xs">
            <Shield className="h-3 w-3 mr-1" />
            Legal Review
          </span>
        );
      case 'technical':
        return (
          <span className="flex items-center text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full text-xs">
            <CheckSquare className="h-3 w-3 mr-1" />
            Technical Review
          </span>
        );
      default:
        return (
          <span className="flex items-center text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs">
            {type}
          </span>
        );
    }
  };

  // Render qualification form
  const renderQualificationForm = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add Document Qualification</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualification Type
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>Content Review</option>
              <option>Legal Review</option>
              <option>Technical Review</option>
              <option>Compliance Check</option>
              <option>Executive Approval</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>Approved</option>
              <option>Rejected</option>
              <option>Changes Requested</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea 
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
              placeholder="Enter detailed comments about this qualification..." 
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => setShowQualificationForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => setShowQualificationForm(false)}
              className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              Submit Qualification
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top navigation bar */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <h1 className="text-xl font-medium">{document.name}</h1>
            <span className="ml-3">{getStatusBadge(document.status)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>ID: {document.id}</span>
            <span className="mx-2">•</span>
            <span>Owner: {document.owner}</span>
            <span className="mx-2">•</span>
            <span>Department: {document.department}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <RotateCcw className="h-4 w-4 mr-1" />
            Restore Version
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <GitBranch className="h-4 w-4 mr-1" />
            Branch
          </button>
          <button 
            onClick={() => setShowQualificationForm(true)}
            className="px-3 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center"
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Add Qualification
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="px-4 flex">
          <button 
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'timeline' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Timeline
          </button>
          <button 
            onClick={() => setActiveTab('qualifications')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'qualifications' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Qualifications
          </button>
          <button 
            onClick={() => setActiveTab('comments')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'comments' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Comments
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'settings' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Settings
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Versions sidebar */}
        <div className="w-80 border-r bg-white overflow-auto">
          <div className="p-4 border-b">
            <h2 className="font-medium">Document Versions</h2>
            <p className="text-sm text-gray-500 mt-1">Current: {document.currentVersion}</p>
          </div>
          <div>
            {versions.map(version => (
              <div key={version.id} className="border-b">
                <div 
                  className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${
                    selectedVersion?.id === version.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleVersionSelect(version)}
                >
                  <button 
                    className="p-1 mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVersionExpand(version.id);
                    }}
                  >
                    {expandedVersions.includes(version.id) ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{version.name}</span>
                      {version.status === 'current' && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {version.date} by {version.author}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {version.qualifications?.length > 0 && (
                      <div className="flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                        <span>{version.qualifications.length}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Subversions */}
                {expandedVersions.includes(version.id) && version.subversions && (
                  <div className="pl-8 border-t bg-gray-50">
                    {version.subversions.map(subversion => (
                      <div 
                        key={subversion.id}
                        className={`flex items-center p-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer ${
                          selectedVersion?.id === subversion.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleVersionSelect(subversion)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium text-sm">{subversion.id}</span>
                            {subversion.status === 'current' && (
                              <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {subversion.date}, {subversion.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Version details */}
        <div className="flex-1 overflow-auto p-6">
          {selectedVersion ? (
            <div>
              <div className="bg-white border rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{selectedVersion.id}</h2>
                      <div className="text-sm text-gray-500 mt-1">
                        {selectedVersion.changes} - {selectedVersion.comment}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <Copy className="h-5 w-5 text-gray-500" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-b bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">Author:</span>
                        <span className="font-medium ml-2">{selectedVersion.author}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium ml-2">{selectedVersion.date}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium ml-2">{selectedVersion.time || 'N/A'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm">
                        <Tags className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">Labels:</span>
                        <span className="font-medium ml-2">Policy, Security, Legal</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {activeTab === 'qualifications' && selectedVersion.qualifications && (
                  <div className="p-4">
                    <h3 className="font-medium mb-3">Qualifications</h3>
                    <div className="space-y-4">
                      {selectedVersion.qualifications.map((qual: { type: any; status: any; date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; by: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; comments: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
                        <div key={index} className="border rounded-md p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {getQualificationTypeBadge(qual.type)}
                              {getStatusBadge(qual.status)}
                            </div>
                            <div className="text-xs text-gray-500">{qual.date}</div>
                          </div>
                          <div className="mt-2">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">{qual.by}</span>
                              <span className="mx-1">•</span>
                              <span>{qual.comments}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <button 
                        onClick={() => setShowQualificationForm(true)}
                        className="w-full border border-dashed border-gray-300 rounded-md p-3 text-gray-500 hover:bg-gray-50 flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add qualification
                      </button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'timeline' && (
                  <div className="p-4">
                    <h3 className="font-medium mb-3">Version Timeline</h3>
                    <div className="space-y-4">
                      <div className="relative pl-6 pb-5 border-l-2 border-blue-200">
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-blue-500"></div>
                        <div className="flex items-center text-sm font-medium mb-1">
                          Version created
                          <span className="text-xs text-gray-500 ml-2">
                            {selectedVersion.date}, {selectedVersion.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{selectedVersion.author} created this version</p>
                      </div>
                      
                      {selectedVersion.qualifications?.map((qual: { type: string; status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; by: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; comments: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
                        <div className="relative pl-6 pb-5 border-l-2 border-blue-200" key={index}>
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-blue-500"></div>
                          <div className="flex items-center text-sm font-medium mb-1">
                            {qual.type.charAt(0).toUpperCase() + qual.type.slice(1)} qualification {qual.status}
                            <span className="text-xs text-gray-500 ml-2">{qual.date}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {qual.by} {qual.status === 'approved' ? 'approved' : 'reviewed'} this version: "{qual.comments}"
                          </p>
                        </div>
                      ))}
                      
                      <div className="relative pl-6">
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="flex items-center text-sm font-medium mb-1">
                          Current state
                          <span className="text-xs text-gray-500 ml-2">Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'comments' && (
                  <div className="p-4">
                    <h3 className="font-medium mb-3">Comments</h3>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                            JM
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center">
                              <span className="font-medium">Jennifer Martinez</span>
                              <span className="ml-2 text-xs text-gray-500">March 29, 2025, 14:40</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">
                              I've incorporated all the legal requirements from Sarah's review. This version should be compliant with the new regulations.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
                            DC
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center">
                              <span className="font-medium">David Chen</span>
                              <span className="ml-2 text-xs text-gray-500">March 28, 2025, 16:30</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">
                              Looking much better now. The clarity on data retention policies is exactly what we needed.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-2 bg-white text-xs text-gray-500">Earlier comments</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="relative">
                          <textarea 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10"
                            placeholder="Add a comment..." 
                            rows={2}
                          />
                          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex justify-end mt-2">
                          <button className="px-3 py-1 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700">
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Changes overview */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">Changes Overview</h3>
                <div className="bg-white border rounded-lg shadow-sm">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Document modifications</div>
                      <div className="text-sm text-gray-500">Compared to previous version</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-green-600 font-medium">Added:</span>
                        <span className="ml-2">Section 4.3: Data Protection Impact Assessment</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-green-600 font-medium">Added:</span>
                        <span className="ml-2">Appendix B: Security Incident Response Template</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-red-600 font-medium">Removed:</span>
                        <span className="ml-2">References to deprecated security protocols</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Edit className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-blue-600 font-medium">Modified:</span>
                        <span className="ml-2">Section 3.2: Access Control Policies (updated requirements)</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Edit className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-blue-600 font-medium">Modified:</span>
                        <span className="ml-2">Section 5.1: Compliance Requirements (updated regulations)</span>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select a version to view its details.</p>
              </div>
            )}
          </div>
        </div>
      {showQualificationForm && renderQualificationForm()}
    </div>
  );
};