"use client"
import React,{useEffect, useMemo, useState} from 'react';
import {Table} from '../../../../components/Table'
import { Button } from '../../../../components/Button';
import CenteredModalAddPack from '../../../../components/AddHealthPackageModal'
import { useDispatch, useSelector } from 'react-redux';
import { deleteHealthPackage, listHealthPackages } from '@/app/redux/actions/healthPackagesActions';
import Image from 'next/image';
import Spinner from "../../../../components/Spinner";
import { Alert } from 'react-bootstrap';
import { set } from 'mongoose';


export default function Admins() {
  const dispatch=useDispatch();
  const [id,setId]=useState(0);
  const healthpackages = useSelector(state=>state.getHealthPackagesReducer.healthPackages)
  const healthpackagesisLoading = useSelector(state=>state.getHealthPackagesReducer.loading)
  const isLoading = useSelector(state=>state.deleteHealthPackageReducer.loading)
  const deleteIsFail = useSelector(state=>state.deleteHealthPackageReducer.error)
  const CreateisLoading = useSelector(state=>state.createHealthPackageReducer.loading)
  const UpdateisLoading = useSelector(state=>state.updateHealthPackageReducer.loading)
  const tableHeaders = ['Package Name','Doctor Session Discount','Medicine Discount','Subscriptions Discount','Price'];
  const [modalShow,setModalShow]=useState(false);
  const [modalShowsec,setModalShowsec]=useState(false);  
  const [isDataChanged, setIsDataChanged] = useState(false);
  const  [removingSuccess,setRemovingSuccess]=useState(false);

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button color="light" className="rounded-circle mx-1" text={<Image src='/edit.svg' height={20} width={20} className=""/>} variant='xs' onClick={() => {setId(id)
          setModalShowsec(true)}}>   </Button>
        <Button color="light" className="rounded-circle mx-1" text={<Image src='/delete.svg' height={20} width={20} className=""/>} variant='xs' onClick={() => handleRemove(id)}> </Button>
      </div>
    );
  };
  const handleRemove =(id)=>{
    dispatch(deleteHealthPackage(id)).then(()=>{
      setIsDataChanged(true);
      if(!deleteIsFail){
        setRemovingSuccess(true);
        const timer = setTimeout(() => {
          setRemovingSuccess(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    });
  } 

  const health = useMemo(() => {
    if (healthpackages && healthpackages.data) {
      return healthpackages.data.map((value) => ({
        name: value.name, 
        doctorDiscount: value.doctorDiscount,
        medicineDiscount: value.medicineDiscount,
        familyMemberSubDiscount: value.familyMemberSubDiscount,
        price: value.price,    
        button: generateButton(value._id),
    
      }));
    }
    return [];
  }, [healthpackages,isLoading,modalShow,modalShowsec,CreateisLoading,UpdateisLoading]);
  
  useEffect(()=>{
    dispatch(listHealthPackages());
    setIsDataChanged(false);
    }
  ,[dispatch, isDataChanged]);

  return (
    <> 
    <h3 className='my-1 mt-0 text-center text-title'>Health Packages</h3>
    <div className='underline-Bold mx-auto mb-3'></div>
    { deleteIsFail && <Alert variant='danger' className='text-center'>{deleteIsFail}</Alert>
    }
    {!deleteIsFail && !healthpackagesisLoading 
    && healthpackages.data?.length === 0 && <Alert variant='danger' className='text-center'>No Health Packages Found</Alert>
    }
  {
    removingSuccess && <Alert variant='success' className='text-center'>Health Package Removed Successfully</Alert>
  }
   { healthpackagesisLoading ? <Spinner/> :
   <div className=" justify-content-center align-items-center min-vh-100 container">
      <div className="row justify-content-end align-items-center">
      <Button text='Add Package' className="ms-auto col-md-2" onClick={()=>{setModalShow(true)}} variant={'md'}></Button>
      </div>
      <Table headers={tableHeaders} data={health ? health : []}></Table>
      <CenteredModalAddPack
        show={modalShow}
        onHide={() => setModalShow(false)} 
        title={"Create new health package"}
        edit={false}
        id={id}
      />
      <CenteredModalAddPack
        show={modalShowsec}
        onHide={() => setModalShowsec(false)} 
        title={"Please Update Package Details"}
        edit={true}
        id={id}
        data={healthpackages.data?.find((value) => value._id === id)}
      />     
    </div>}
    </>
  );
}
