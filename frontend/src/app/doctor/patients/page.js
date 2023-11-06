'use client'
import React, { useEffect, useState } from 'react';
import { Table} from '../../../../components/Table'; 
import { Button} from '../../../../components/Button'; 
import './page.css' ;
import { useDispatch, useSelector } from 'react-redux';
import { viewPatients } from '@/app/redux/actions/patientsActions';
import Image from 'next/image';




function PatientsList() {
  const tableHeaders = ['name','email','date of birth','gender', 'phone number','Appointment date','']; // Add a new column header

  const tabledata2 = useSelector(state => state.patientsReducer?.patients?.data)
  const tabledataU1 = useSelector(state => state.filterPatientsBasedOnUpcomingAppointmentsReducer?.patients?.data)
  const [name,setName] = useState({});
  const [upcoming,setUpcoming] = useState({});

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button text='view' variant='xs' onClick={() => window.location.replace(`/patient/${id}`)}></Button>
      </div>
    );
  };

  let tabledata = tabledata2?.map(item => {
    console.log(item)
    const { emergencyContact,id,_id,user,__v,healthRecords ,...rest } = item;
    rest.button = generateButton(_id)
    return rest;
  })

 
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(viewPatients({...name,...upcoming}))
  },[name,upcoming])

  const handleClearFilters = () => {
    setName(null);
    setUpcoming(null);
  }

 
  return (
    <div className='m-2'>
      <h3 className='my-1 mt-0 text-center text-title'>Patients</h3>
      <div className='underline-Bold mx-auto mb-5'></div>
      <div className='row flex align-items-center justify-content-start bg-light p-2 pe-0 m-3 rounded border'>
        <div className="col-md-1">
          <Image src='/filter.svg' height={30} width={30} className=""/>
        </div>  
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Patient Name"
            className="form-control my-auto"
            onChange={(e) =>{setName( {"name": e.target.value } );}} />
        </div>
        <div className="col-md-3 container-fluid" style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="upcomingAppointments">Upcoming Appointments</label>
          <input
            onChange={(e) => {setUpcoming(e.target.checked ? {status:'Upcoming'}:{})}}
            type="checkbox" id="upcomingAppointments" name="upAp" value="upAp" 
            style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
        </div>
        <div className="col-md-3 ms-auto">
          <Button text="Clear Filters" className="w-60 ms-5" onClick={handleClearFilters} variant={'md'}></Button>       
        </div>
      </div>
    <div className=".patient-table-container">
    <Table headers={tableHeaders} data={tabledata}  itemsPerPageOptions={[5, 10, 15]} />
    </div>
    </div>
  );
 
}

export default PatientsList;
