import {Link} from "react-router-dom";
import React from "react";
import { ClassList } from "Mock/ClassList";
import ClassCards from "./ClassCards";
import Title from "./Title";

export default function Cards({rooms, handleChange, handleSubmit, open, setOpen, school}) {
  return (
    <>
      <Title handleChange={handleChange} handleSubmit={handleSubmit} open={open} setOpen={setOpen} />
      <ClassCards rooms={rooms} school={school}/>
    </>
  );
}
