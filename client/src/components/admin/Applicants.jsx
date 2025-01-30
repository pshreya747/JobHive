import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application); // Corrected spelling from "applicaton" to "application"

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job)); // Ensure res.data.job structure matches expected Redux state
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [dispatch, params.id]);

    // Conditional rendering to prevent errors if applicants is undefined
    if (!applicants || !applicants.applications) {
        return (
            <div>
                <Navbar />
                <div className='max-w-7xl mx-auto'>
                    <h1 className='font-bold text-xl my-5'>No applicants found.</h1>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>
                    Applicants {applicants.applications.length}
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
