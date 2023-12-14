"use client";
import { getPatientAppointments } from "@/app/redux/actions/patientActions";
import { BottomCallout } from "@/components/BottomCallout";
import PersonalCard from "@/components/PersonCard";
import TableComponent from "@/components/Table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToDDMMYYYY } from "../../redux/validators";
import { Button, DatePicker } from "@tremor/react";
import { Select, SelectItem, TextInput } from "@tremor/react";
import {
  cancelAction,
  followUpAction,
} from "@/app/redux/actions/appointmentActions";
import ReserveCalendar from "@/components/ReserveCalendar";
import { viewDoctorDetails } from "@/app/redux/actions/doctorActions";
import RescheduleCalendar from "@/components/RescheduleCalendar";

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector(
    (state) => state.viewPatientsAppointmentsReducer
  );
  const { doctor, loading: doctorLoading } = useSelector(
    (state) => state.doctorReducer
  );
  const { loading: followUpLoading } = useSelector(
    (state) => state.followUpReducer
  );
  const { loading: rescheduleLoading } = useSelector(
    (state) => state.rescheduleReducer
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [freeze, setFreeze] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [doctorID, setDoctorID] = useState("");
  const formatDateToISOString = (date) => {
    if (!date) return "";
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const selectedDateState = utcDate.toUTCString();
    return selectedDateState;
  };

  async function fetchData() {
    const queryObj = {
      date: formatDateToISOString(selectedDate),
      status: selectedStatus,
    };

    const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
      if (queryObj[key] !== "") {
        acc[key] = queryObj[key];
      }
      return acc;
    }, {});

    dispatch(getPatientAppointments(filteredQueryObj));
  }
  const [appointmentId, setAppointmentId] = useState("");
  const handleReschedule = (id, appointmentId) => {
    dispatch(viewDoctorDetails(id));
    console.log(id);
    setAppointmentId(appointmentId);
    // setDoctorID(id)
  };
  useEffect(() => {
    //dispatch(viewDoctorDetails(doctorID))
    if (!doctorLoading && doctor) setReschedule(true);
    setDoctorID(doctor?._id);
  }, [doctorLoading]);
  const handleCancel = (id) => {
    dispatch(cancelAction(id));
  };
  const handleFollowUp = (id) => {
    dispatch(followUpAction(id));
  };
  const { loading: cancelLoading } = useSelector(
    (state) => state.cancelReducer
  );
  const appointmentList = useMemo(() => {
    return appointments?.data?.map(
      ({ date, doctorId, status, followUp, _id }) => ({
        date: formatDateToDDMMYYYY(date),
        doctorname: doctorId.name,
        status: status,
        buttons:
          status === "Upcoming" ? (
            followUp === "None" ? (
              <>
                <Button
                  variant="secondary"
                  className="mx-7"
                  onClick={(e) => {
                    handleReschedule(doctorId._id, _id);
                  }}
                >
                  Reschedule
                </Button>
                <Button
                  variant="secondary"
                  color="red"
                  onClick={(e) => handleCancel(_id)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled={true}
                  variant="secondary"
                  className="mx-7"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "transparent",
                    cursor: "default",
                  }}
                >
                  Reschedule
                </Button>
                <Button
                  variant="secondary"
                  color="red"
                  onClick={(e) => handleCancel(_id)}
                >
                  Cancel
                </Button>
              </>
            )
          ) : status === "Completed" ? (
            followUp === "None" ? (
              <>
                <Button
                  variant="secondary"
                  className="mx-8"
                  color="green"
                  onClick={(e) => handleFollowUp(_id)}
                >
                  Follow Up
                </Button>
              </>
            ) : followUp === "FollowUpRequest" ? (
              <span className="mx-10">Awaiting Doctor</span>
            ) : followUp === "Accepted" ? (
              <span className="mx-10">Follow Up Scheduled</span>
            ) : (
              <span className="mx-10">Follow Up Rejected</span>
            )
          ) : (
            ""
          ),
      })
    );
  }, [appointments]);

  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    selectedDate,
    selectedStatus,
    cancelLoading,
    followUpLoading,
    rescheduleLoading,
  ]);

  // useEffect (()=>{
  // dispatch(viewDoctorDetails(doctorID))
  // },[doctorID,dispatch])
  return (
    <>
      {!reschedule ? (
        <>
          <div className="flex flex-row gap-4 mb-4">
            <Select
              placeholder={`\xa0\xa0\xa0Filter (By Status)`}
              icon={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="ml-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
              )}
              className="flex-[2]"
              onChange={(e) => {
                setSelectedStatus(e);
              }}
            >
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Missed">Missed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Rescheduled">Rescheduled</SelectItem>
            </Select>
            <div className="flex-[1]">
              <DatePicker
                selected={selectedDate}
                onValueChange={(date) => {
                  setSelectedDate(date); // This should be a Date object or null
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="Appointment Date"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex overflow-hidden gap-x-4 gap-y-8">
            <div className="prof h-400 overflow-hidden w-[120%] rounded-xl p-10">
              <TableComponent
                rows={appointmentList}
                columns={["Doctor Name", "Date", "Status"]}
                fields={["doctorname", "date", "status", "buttons"]}
                freeze={freeze}
                badgeColumns={[]}
                title={"Manage Appointments"}
              />
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <div
            role="button"
            onClick={() => setReschedule(false)}
            className="ms-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <RescheduleCalendar
            id={doctorID}
            appointmentId={appointmentId}
          ></RescheduleCalendar>
        </>
      )}
    </>
  );
};

export default Appointments;
