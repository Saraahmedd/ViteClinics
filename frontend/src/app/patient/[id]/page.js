"use client";
import Image from "next/image";
import { useState } from "react";
import { Card } from "../../../../components/Card";

export default function patientProfile({ params }) {
  const [patient, setPatient] = useState({
    user: "user_id_here", // Replace with a valid user ID
    name: "John Doe",
    email: "johndoe@example.com",
    dateOfBirth: new Date("1990-01-01"),
    gender: "male",
    package: "health_package_id_here", // Replace with a valid health package ID
    mobileNumber: "1234567890",
    emergencyContact: {
      fullName: "Emergency Contact Name",
      mobileNumber: "9876543210",
    },
    healthRecords: ["Record 1", "Record 2"],
  });
  const permission = "patient";
  const id = params.id;

  function HealthRecords() {
    return (
      <div className="d-flex">
        {patient.healthRecords.map((value, index) => (
          <div className="w-50 p-3" key={index}>
            <Card title={index + 1} text={value}></Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className=" p-5 d-flex">
      <div className=" w-25 border-end">
        <div className="p-3 border-bottom m-3">
          <div className="d-flex justify-content-center ">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z"
                  fill="#0d6efd"
                ></path>{" "}
                <path
                  d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
                  fill="#0d6efd"
                ></path>{" "}
              </g>
            </svg>
          </div>
        </div>

        <div className="py-2 d-flex ">
          <span className="fw-bold w-25 ms-4">Date Of Birth: </span>
          <span>{patient.dateOfBirth.toDateString()}</span>
        </div>
        <div className="py-2 d-flex ms-4">
          <span className="fw-bold w-25">Gender: </span>
          <span className="w-50">{patient.gender}</span>
        </div>
      </div>
      <div className="p-3 w-75">
        <div className="border-bottom d-flex ">
          <div className="w-75">
            <h1>{patient.name}</h1>
            <p className="px-3 text-secondary">{patient.user}</p>
          </div>
        </div>

        <div className="p-2 ">
          <div className="d-flex">
            <div className="w-50">
              <div className="text-body-secondary fw-bold small p-3 ">
                patient Information
              </div>
              <div className="p-3">
                <div className="py-3 d-flex">
                  <span className="fw-bold w-25">Email: </span>
                  <span className="w-50">{patient.email}</span>
                </div>

                <div className="py-3 d-flex">
                  <span className="fw-bold w-25">package: </span>
                  <span className="w-50">{patient.package}</span>
                </div>
                <div className="py-2 d-flex">
                  <span className="fw-bold w-25">mobile number: </span>
                  <span>{patient.mobileNumber}</span>
                </div>
              </div>
            </div>
            <div className="w-50">
              <div>
                <div className="text-body-secondary fw-bold small p-3 border-bottom">
                  Extra Information
                </div>
                <p className="p-3 ">bla bla bla bla bla</p>
              </div>
              <div>
                <div className="text-body-secondary fw-bold small p-3 border-bottom">
                  Emergency Contact
                </div>
                <div className="w-50 p-3">
                  <Card
                    title={patient.emergencyContact.fullName}
                    subtitle={patient.emergencyContact.mobileNumber}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-body-secondary fw-bold small p-3 border-bottom">
              Health Records
            </div>
            <HealthRecords />
          </div>
        </div>
      </div>
    </div>
  );
}
