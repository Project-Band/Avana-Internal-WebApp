"use client"

import React, { useState } from 'react';
import { Button } from '@/components';
import toast from 'react-hot-toast';
import { CREATE_PROJECT_API } from '@/apiConfig';

const CreateProject = () => {
  const [project, setProject] = useState({
    projectTitle: '',
    startDate: '',
    endDate: '',
    sections: [],
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSections = [...project.sections];
    updatedSections[index] = { ...updatedSections[index], [name]: value };
    setProject({ ...project, sections: updatedSections });
  };

  const handleAddSection = () => {
    setProject({
      ...project,
      sections: [
        ...project.sections,
        { sectionTitle: '', sectionImage: null, sectionDesc: '' }
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(CREATE_PROJECT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      })
     
      if (response.ok) {
        toast.success('Project Created Successfully');
        onClose()
      } else {
          toast.error('Couldn\'t create the project.');
        }
    } catch (error) {
      toast.error('Error creating Project. Please check your internet connection.');
    }
  };


  return (
    <div className="adminContent flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="px-2">Create Project</h2>
        <div onClick={handleSubmit}>
          <Button type="add" label="Create Project" />
        </div>
      </div>
      <div className="flex flex-col gap-10 overflow-y-scroll overflow-x-auto px-2 pr-4">
        <div className="flex flex-col gap-2 h-max">
          <h4 className="text-primary">Project Title</h4>
          <input
            type="text"
            placeholder="Enter Project Title"
            className="formInput"
            name="projectTitle"
            value={project.projectTitle}
            onChange={(e) => setProject({ ...project, projectTitle: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 h-max">
          <h4 className="text-primary">Project Deadline</h4>
          <div className="flex gap-8 w-full">
            <label className="flex w-full whitespace-nowrap items-center gap-4 text-black150">
              Start Date:{' '}
              <input
                type="date"
                placeholder="Start Date"
                className="text-base bg-white100 text-black150 rounded-sm focus:outline-none p-2 px-4 w-max"
                name="startDate"
                value={project.startDate}
                onChange={(e) => setProject({ ...project, startDate: e.target.value })}
              />
            </label>
            <label className="flex w-full whitespace-nowrap items-center gap-4 text-black150">
              End Date:{' '}
              <input
                type="date"
                placeholder="End Date"
                className="text-base bg-white100 text-black150 rounded-sm focus:outline-none p-2 px-4 w-max"
                name="endDate"
                value={project.endDate}
                onChange={(e) => setProject({ ...project, endDate: e.target.value })}
              />
            </label>
          </div>
        </div>
        <div className="bg-primary py-1 w-full" />
        <h4 className="text-primary text-center">Project Sections</h4>
        {project.sections.map((section, index) => (
          <div key={index} className='flex flex-col gap-6 w-full'>
            <div className="flex flex-col gap-2 h-max">
              <input
                type="text"
                placeholder="Section title (Optional)"
                className="formInput"
                name="sectionTitle"
                value={section.sectionTitle}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div className="flex flex-col gap-2 h-max">
              <h4 className="text-primary">Upload Section Image (optional)</h4>
              <input
                type="file"
                accept="image/*"
                name="sectionImage"
                onChange={(e) => handleInputChange(e, index)}
                placeholder="Upload Project Image"
                className='text-base h-[80px] text-black150 border-none file:w-full file:h-full file:cursor-pointer file:bg-white100  file:m-0 file:mt-1 file:text-black150 file:px-3 file:border-none'
              />
            </div>
            <div className="flex flex-col gap-2 h-max w-full">
              <h4 className="text-primary">Section Description</h4>
              <textarea
                name="sectionDesc"
                onChange={(e) => handleInputChange(e, index)}
                className="h-[200px] rounded-sm w-full p-3 focus:outline-none"
                placeholder="Add Description of Project"
                value={section.sectionDesc}
              />
            </div>
            <hr className="w-full border-primary border-dashed" />
          </div>
        ))}
        <div className="text-center mx-5" onClick={handleAddSection}>
          <Button type="add" label="Add Section" />
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
