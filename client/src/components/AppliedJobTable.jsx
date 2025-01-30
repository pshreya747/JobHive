import React, { useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  
  const { allAppliedJobs } = useSelector((store) => store.job) || { allAppliedJobs: [] };


  useEffect(() => {
    console.log('All Applied Jobs:', allAppliedJobs);
  }, [allAppliedJobs]);

 
  const hasAppliedJobs = Array.isArray(allAppliedJobs) && allAppliedJobs.length > 0;

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!hasAppliedJobs ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split('T')[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                 
                  {appliedJob?.status ? (
                    <Badge
                      className={`${
                        appliedJob.status === 'rejected'
                          ? 'bg-red-400'
                          : appliedJob.status === 'pending'
                          ? 'bg-gray-400'
                          : 'bg-green-400'
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  ) : (
                    <span className="text-red-500">Status Missing</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
